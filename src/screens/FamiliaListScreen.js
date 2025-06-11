import React from 'react';
import { ScrollView } from 'react-native';
import { FamilyCard, PrimaryButton, Ionicons } from '../components/UI';
import styled from 'styled-components/native';

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

const FamiliaListScreen = ({ navigation }) => {
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

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const AddButton = styled.TouchableOpacity`
  padding: 5px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 8px 15px;
  border-radius: 15px;
  background-color: ${props => props.active ? '#F8706020' : 'transparent'};
  margin-right: 10px;
  border: 1px solid ${props => props.active ? '#F87060' : '#ddd'};
`;

const FilterText = styled.Text`
  color: ${props => props.active ? '#F87060' : '#666'};
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
`;

export default FamiliaListScreen;