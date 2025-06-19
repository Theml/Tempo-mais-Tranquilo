import React from 'react';
import { ScrollView } from 'react-native';
import { 
  Container, 
  Title, 
  Description,
  CardContainer,
  CardTitle,
  CardBody,
  CardInfo,
  PrimaryButton,
  SectionTitle
} from '../components/UI';
import { Ionicons } from '@expo/vector-icons';

const FamiliaPerfilScreen = () => {
  const familyData = {
    nome: 'Família Silva',
    endereco: 'Rua das Flores, 123 - Centro, São Paulo/SP',
    telefone: '(11) 98765-4321',
    vulnerabilidades: 'Desemprego do chefe da família, criança com asma',
    necessidades: 'Cesta básica, remédios para asma, material escolar',
    membros: '4 pessoas (2 adultos, 2 crianças)',
    ultimaVisita: '15/06/2023',
    responsavel: 'Maria Oliveira (Assistente Social)'
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>{familyData.nome}</Title>
        <Description>Cadastrada em: 10/05/2023</Description>
        
        <SectionTitle>Informações Básicas</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="location" size={16} color="#F87060" /> 
              {familyData.endereco}
            </CardInfo>
            <CardInfo>
              <Ionicons name="call" size={16} color="#F87060" /> 
              {familyData.telefone}
            </CardInfo>
            <CardInfo>
              <Ionicons name="people" size={16} color="#F87060" /> 
              {familyData.membros}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <SectionTitle>Situação</SectionTitle>
        <CardContainer>
          <CardTitle>Vulnerabilidades</CardTitle>
          <CardBody>
            <CardInfo>{familyData.vulnerabilidades}</CardInfo>
          </CardBody>
        </CardContainer>

        <CardContainer>
          <CardTitle>Necessidades Atuais</CardTitle>
          <CardBody>
            <CardInfo>{familyData.necessidades}</CardInfo>
          </CardBody>
        </CardContainer>

        <SectionTitle>Acompanhamento</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="calendar" size={16} color="#F87060" /> 
              Última visita: {familyData.ultimaVisita}
            </CardInfo>
            <CardInfo>
              <Ionicons name="person" size={16} color="#F87060" /> 
              Responsável: {familyData.responsavel}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <PrimaryButton 
          title="Editar Perfil" 
          onPress={() => console.log("Editar")}
          icon="create"
        />
        
        <PrimaryButton 
          title="Registrar Nova Necessidade" 
          onPress={() => console.log("Nova necessidade")}
          icon="add-circle"
        />
      </ScrollView>
    </Container>
  );
};

export default FamiliaPerfilScreen;