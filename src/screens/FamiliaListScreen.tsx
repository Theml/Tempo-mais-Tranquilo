import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { FamilyCard, Container, Header, Title, AddButton, FilterContainer, FilterButton, FilterText, SearchContainer, SearchInput } from '../components/UI';
import { Ionicons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Family } from '../types/index';

import { database } from '../services/database';
import { useAuth } from '../context/AuthContext';

type FamiliaListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FamiliaList'>;

interface Props {
  navigation: FamiliaListScreenNavigationProp;
}

export default function FamiliaListScreen({ navigation }: Props) {
  const [familias, setFamilias] = useState<Family[]>([]);
  const [filteredFamilias, setFilteredFamilias] = useState<Family[]>([]);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<'todas' | 'prioritarias' | 'minhas'>('todas');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Função para buscar famílias
  const fetchFamilias = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Tentar buscar famílias do usuário primeiro
      let familiasList = [];
      try {
        familiasList = await database.getFamilias();
      } catch (error) {
        console.log('Erro ao buscar famílias do usuário, tentando buscar todas...');
        console.error('Erro original:', error);
        
        // Fallback: buscar todas as famílias
        familiasList = await database.getAllFamilias();
      }
      
      console.log('Famílias carregadas:', familiasList.length);
      setFamilias(familiasList);
      setFilteredFamilias(familiasList);
    } catch (error) {
      console.error('Erro ao buscar famílias:', error);
      Alert.alert('Erro', 'Não foi possível carregar as famílias');
      setFamilias([]);
      setFilteredFamilias([]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar famílias quando o componente montar
  useEffect(() => {
    fetchFamilias();
  }, [user]);

  // Aplicar filtros e busca
  useEffect(() => {
    let filtered = [...familias];

    // Aplicar filtro de busca
    if (searchText.trim()) {
      filtered = filtered.filter(familia => 
        familia.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        (familia.endereco && familia.endereco.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // Aplicar filtros específicos
    switch (activeFilter) {
      case 'prioritarias':
        filtered = filtered.slice(0, Math.ceil(filtered.length / 2));
        break;
      case 'minhas':
        break;
      default:
        break;
    }

    setFilteredFamilias(filtered);
  }, [familias, searchText, activeFilter]);

  // Refresh quando a tela ganha foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFamilias();
    });

    return unsubscribe;
  }, [navigation]);

  const handleFamilyPress = (family: Family) => {
    // Converter para o formato esperado pela tela de perfil
    const familyForProfile = {
      id: family.id,
      nome: family.nome,
      endereco: family.endereco || '',
      telefone: family.telefone || '',
      vulnerabilidades: family.vulnerabilidades || '',
      necessidades: family.necessidades || '',
      membros: family.membros || [],
      responsavel: family.responsavel || '',
      lastVisit: family.lastVisit,
      createdAt: family.createdAt,
      updatedAt: family.updatedAt,
    };

    navigation.navigate('FamiliaPerfil', { family: familyForProfile });
  };

  const getFilterButtonStyle = (filter: string) => ({
    backgroundColor: activeFilter === filter ? '#F87060' : 'transparent',
  });

  const getFilterTextStyle = (filter: string) => ({
    color: activeFilter === filter ? '#FFF' : '#666',
  });

  return (
    <Container>
      <Header>
        <Title>Famílias Cadastradas</Title>
        <AddButton onPress={() => navigation.navigate('CadastroFamilia')}>
          <Ionicons name="add" size={24} color="#F87060" />
        </AddButton>
      </Header>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <FilterContainer>
          <FilterButton 
            style={getFilterButtonStyle('todas')}
            onPress={() => setActiveFilter('todas')}
          >
            <FilterText style={getFilterTextStyle('todas')}>
              Todas ({familias.length})
            </FilterText>
          </FilterButton>
          <FilterButton 
            style={getFilterButtonStyle('prioritarias')}
            onPress={() => setActiveFilter('prioritarias')}
          >
            <FilterText style={getFilterTextStyle('prioritarias')}>
              Prioritárias
            </FilterText>
          </FilterButton>
          <FilterButton 
            style={getFilterButtonStyle('minhas')}
            onPress={() => setActiveFilter('minhas')}
          >
            <FilterText style={getFilterTextStyle('minhas')}>
              Minhas
            </FilterText>
          </FilterButton>
        </FilterContainer>

        <SearchContainer>
          <Ionicons name="search" size={20} style={{ marginRight: 10 }} />
          <SearchInput 
            placeholder="Buscar famílias..." 
            value={searchText}
            onChangeText={setSearchText}
          />
        </SearchContainer>

        {loading ? (
          <Container style={{ padding: 20, alignItems: 'center' }}>
            <Title>Carregando famílias...</Title>
          </Container>
        ) : filteredFamilias.length === 0 ? (
          <Container style={{ padding: 20, alignItems: 'center' }}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Title style={{ color: '#666', fontSize: 16, marginTop: 10 }}>
              {searchText ? 'Nenhuma família encontrada' : 'Nenhuma família cadastrada'}
            </Title>
            {!searchText && (
              <Title style={{ color: '#999', fontSize: 14, textAlign: 'center', marginTop: 5 }}>
                Toque no botão + para cadastrar sua primeira família
              </Title>
            )}
          </Container>
        ) : (
          filteredFamilias.map(family => (
            <FamilyCard
              key={family.id}
              name={family.nome}
              address={family.endereco || 'Endereço não informado'}
              needs={family.necessidades || 'Nenhuma necessidade específica'}
              onPress={() => handleFamilyPress(family)}
            />
          ))
        )}
      </ScrollView>
    </Container>
  );
}