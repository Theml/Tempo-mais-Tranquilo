import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { FamilyCard, Container, Header, Title, AddButton, FilterContainer, FilterButton, FilterText, SearchContainer, SearchInput } from '../components/UI';
import { Ionicons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';

import { database } from '../services/database';
import { useAuth } from '../context/AuthContext';

type FamiliaListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FamiliaList'>;

interface Props {
  navigation: FamiliaListScreenNavigationProp;
}

export default function FamiliaListScreen({ navigation }: Props) {
  const [familias, setFamilias] = useState<any[]>([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      database.getFamilias().then(setFamilias);
    }
  }, [loading, user]);

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
          <Ionicons name="search" size={20} style={{ marginRight: 10 }} />
          <SearchInput placeholder="Buscar famílias..." />
        </SearchContainer>

        {familias.map(family => (
          <FamilyCard
            key={family.id}
            name={family.nome}
            address={family.endereco}
            needs={family.necessidades}
            onPress={() => navigation.navigate('FamiliaPerfil', { family })}
          />
        ))}
      </ScrollView>
    </Container>
  );
}