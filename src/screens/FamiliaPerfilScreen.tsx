import React, { useState, useEffect } from 'react';
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

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/index';

import { database } from '../services/database';

type FamiliaPerfilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FamiliaPerfil'>;

interface Props {
  navigation: FamiliaPerfilScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'FamiliaPerfil'>;
}

export default function FamiliaPerfilScreen({ navigation, route }: Props) {
  const [familyData, setFamilyData] = useState<any>(route.params?.family);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Dados recebidos via route:', route.params?.family);
    
    if (familyData?.id) {
      setLoading(true);
      database.getFamiliaById(familyData.id)
        .then(data => {
          console.log('Dados carregados do banco:', data);
          if (data) {
            setFamilyData(data);
          }
        })
        .catch(error => {
          console.error('Erro ao carregar família:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [familyData?.id]);

  // Função para formatar a data
  const formatDate = (date: any) => {
    if (!date) return 'Não informado';
    
    // Se for um timestamp do Firestore
    if (date.toDate && typeof date.toDate === 'function') {
      return date.toDate().toLocaleDateString('pt-BR');
    }
    
    // Se for uma data normal
    if (date instanceof Date) {
      return date.toLocaleDateString('pt-BR');
    }
    
    // Se for uma string
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('pt-BR');
    }
    
    return 'Não informado';
  };

  // Função para formatar membros da família
  const formatMembers = (members: any) => {
    if (!members || !Array.isArray(members)) {
      return 'Não informado';
    }
    
    if (members.length === 0) {
      return 'Nenhum membro cadastrado';
    }
    
    return `${members.length} membro${members.length > 1 ? 's' : ''}`;
  };

  if (!familyData) {
    return (
      <Container>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Title>Família não encontrada</Title>
          <Description>Não foi possível carregar os dados da família.</Description>
        </ScrollView>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>{familyData.nome || familyData.name || 'Nome não informado'}</Title>
        <Description>
          Cadastrada em: {formatDate(familyData.createdAt)}
        </Description>
        
        <SectionTitle>Informações Básicas</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="location" size={16} color="#F87060" /> 
              {familyData.endereco || familyData.address || 'Endereço não informado'}
            </CardInfo>
            <CardInfo>
              <Ionicons name="call" size={16} color="#F87060" /> 
              {familyData.telefone || familyData.phone || 'Telefone não informado'}
            </CardInfo>
            <CardInfo>
              <Ionicons name="people" size={16} color="#F87060" /> 
              {formatMembers(familyData.membros || familyData.members)}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <SectionTitle>Situação</SectionTitle>
        <CardContainer>
          <CardTitle>Vulnerabilidades</CardTitle>
          <CardBody>
            <CardInfo>
              {familyData.vulnerabilidades || familyData.vulnerabilities || 'Não informado'}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <CardContainer>
          <CardTitle>Necessidades Atuais</CardTitle>
          <CardBody>
            <CardInfo>
              {familyData.necessidades || familyData.needs || 'Não informado'}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <SectionTitle>Acompanhamento</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="calendar" size={16} color="#F87060" /> 
              Última visita: {formatDate(familyData.ultimaVisita || familyData.lastVisit)}
            </CardInfo>
            <CardInfo>
              <Ionicons name="person" size={16} color="#F87060" /> 
              Responsável: {familyData.responsavel || 'Não informado'}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <PrimaryButton 
          title="Editar Perfil" 
          onPress={() => navigation.navigate('EditFamiliaPerfil', { family: familyData })}
          icon="create"
        />
        
        <PrimaryButton 
          title="Registrar Nova Necessidade" 
          onPress={() => navigation.navigate('Necessidade', { familyId: familyData.id })}
          icon="add-circle"
        />
      </ScrollView>
    </Container>
  );
}