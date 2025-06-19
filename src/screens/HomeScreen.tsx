import React from 'react';
import { ScrollView } from 'react-native';
import { 
  Container, 
  Title, 
  PrimaryButton, 
  SectionTitle,
  CardContainer,
  CardTitle,
  CardBody,
  CardInfo
} from '../components/UI';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen(){
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Bem-vindo</Title>
        
        <SectionTitle>Resumo</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="people" size={20} color="#F87060" /> 
              Famílias cadastradas: 24
            </CardInfo>
            <CardInfo>
              <Ionicons name="alert-circle" size={20} color="#F87060" /> 
              Necessidades urgentes: 5
            </CardInfo>
          </CardBody>
        </CardContainer>

        <SectionTitle>Ações Rápidas</SectionTitle>
        <PrimaryButton 
          title="Cadastrar Nova Família" 
          onPress={() => console.log("Navegar para cadastro")}
          icon="people"
        />
        
        <PrimaryButton 
          title="Registrar Visita" 
          onPress={() => console.log("Navegar para visitas")}
          icon="calendar"
        />
        
        <PrimaryButton 
          title="Ver Necessidades Urgentes" 
          onPress={() => console.log("Navegar para necessidades")}
          icon="alert"
        />

        <SectionTitle>Atualizações Recentes</SectionTitle>
        <CardContainer>
          <CardTitle>Família Silva</CardTitle>
          <CardBody>
            <CardInfo>Nova necessidade: Medicamentos</CardInfo>
            <CardInfo>Urgência: Alta</CardInfo>
          </CardBody>
        </CardContainer>

        <CardContainer>
          <CardTitle>Família Oliveira</CardTitle>
          <CardBody>
            <CardInfo>Visita realizada: 20/06/2023</CardInfo>
          </CardBody>
        </CardContainer>
      </ScrollView>
    </Container>
  );
};