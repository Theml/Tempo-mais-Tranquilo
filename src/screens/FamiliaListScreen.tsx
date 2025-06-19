import React from 'react';
import { ScrollView } from 'react-native';
import { FamilyCard, Container, Header, Title, AddButton, FilterContainer, FilterButton, FilterText, SearchContainer, SearchInput } from '../components/UI';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const mockFamilies = [
  {
    id: 1,
    name: 'Família Silva',
    address: 'Rua das Flores, 123 - Centro',
    needs: 'Alimentos, Roupas',
    vulnerabilities: 'Desemprego'
  },
  {
    id: 2,
    name: 'Família Oliveira',
    address: 'Av. Principal, 456 - Vila Nova',
    needs: 'Remédios, Cobertores',
    vulnerabilities: 'Doença crônica'
  },
  {
    id: 3,
    name: 'Família Souza',
    address: 'Travessa Esperança, 789 - Jardim',
    needs: 'Material escolar',
    vulnerabilities: 'Mãe solo com 3 filhos'
  },
];

type RootStackParamList = {
  CadastroFamilia: undefined;
  FamiliaPerfil: { family: typeof mockFamilies[0] };
  // Adicione outras rotas aqui se necessário
};

type FamiliaListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroFamilia'>;

interface Props {
  navigation: FamiliaListScreenNavigationProp;
}

const FamiliaListScreen: React.FC<Props> = ({ navigation }) => {
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
        
        {/* Lista de famílias */}
        {mockFamilies.map(family => (
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
};

export default FamiliaListScreen;