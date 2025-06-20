import React from 'react';
import { ScrollView } from 'react-native';
import { FamilyCard, Container, Header, Title, AddButton, FilterContainer, FilterButton, FilterText, SearchContainer, SearchInput } from '../components/UI';
import { Ionicons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';

import { database } from '../services/database';

type FamiliaListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroFamilia'>;

interface Props {
  navigation: FamiliaListScreenNavigationProp;
}

export default function FamiliaListScreen({ navigation }: Props) {
  const [familias, setFamilias] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchFamilias = async () => {
      const data = await database.getFamilias();
      setFamilias(data);
    };
    fetchFamilias();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Famílias Cadastradas</Title>
        <AddButton onPress={() => navigation.navigate('CadastroFamilia')}>
          <Ionicons name="add" size={24} color="#F87060" />
        </AddButton>
      </Header>
      
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {/* Filtros e busca */}
        <FilterContainer>
          <FilterButton active>
            <FilterText active>Todas</FilterText>
          </FilterButton>
          <FilterButton>
            <FilterText>Prioritárias</FilterText>
          </FilterButton>
          <FilterButton>
            <FilterText>Minhas</FilterText>
          </FilterButton>
        </FilterContainer>
        
        <SearchContainer>
          <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
          <SearchInput placeholder="Buscar famílias..." />
        </SearchContainer>
        
        {/* Lista de famílias reais */}
        {familias.map(family => (
          <FamilyCard
            key={family.id}
            name={family.name}
            address={family.address}
            needs={family.needs}
            onPress={() => navigation.navigate('FamiliaPerfil', { family })}
          />
        ))}
      </ScrollView>
    </Container>
  );
}