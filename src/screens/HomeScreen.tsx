import React, { useState, useEffect } from 'react';
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

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import { database } from '../services/database';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [recentUpdates, setRecentUpdates] = useState<any[]>([]);
  const [totalFamilias, setTotalFamilias] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar famílias
        const familias = await database.getFamilias();
        setTotalFamilias(familias.length);
        // Buscar atualizações recentes (simulação, crie o método no database.ts)
        if (database.getUpdates) {
          const updates = await database.getUpdates();
          setRecentUpdates(updates);
        } else {
          setRecentUpdates([]); // Se não houver método, lista vazia
        }
      } catch (error) {
        setTotalFamilias(0);
        setRecentUpdates([]);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Bem-vindo</Title>
        
        <SectionTitle>Resumo</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="people" size={20} color="#F87060" /> 
              Famílias cadastradas: {totalFamilias}
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
          onPress={() => navigation.navigate('CadastroFamilia')}
          icon="people"
        />
        
        <PrimaryButton 
          title="Registrar Visita" 
          onPress={() => console.log("Navegar para visitas")}
          icon="calendar"
        />

        <SectionTitle>Atualizações Recentes</SectionTitle>
        {recentUpdates.length === 0 && (
          <CardContainer>
            <CardBody>
              <CardInfo>Nenhuma atualização recente.</CardInfo>
            </CardBody>
          </CardContainer>
        )}
        {recentUpdates.map(update => (
          <CardContainer key={update.id}>
            <CardTitle>{update.familyName}</CardTitle>
            <CardBody>
              <CardInfo>{update.description}</CardInfo>
              <CardInfo>
                {update.createdAt && new Date(update.createdAt).toLocaleString('pt-BR')}
              </CardInfo>
            </CardBody>
          </CardContainer>
        ))}
      </ScrollView>
    </Container>
  );
};