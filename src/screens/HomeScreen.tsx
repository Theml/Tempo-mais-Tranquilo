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
import { RootStackParamList, Family } from '../types/index';
import { database } from '../services/database';
import { useAuth } from '../context/AuthContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface RecentUpdate {
  id: string;
  familyName: string;
  description: string;
  createdAt: any;
  type: 'cadastro' | 'atualizacao';
}

export default function HomeScreen({ navigation }: Props) {
  const [recentUpdates, setRecentUpdates] = useState<RecentUpdate[]>([]);
  const [totalFamilias, setTotalFamilias] = useState<number>(0);
  const [necessidadesUrgentes, setNecessidadesUrgentes] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar famílias com fallback
        let familias = [];
        try {
          familias = await database.getFamilias();
        } catch (error) {
          console.log('Tentando buscar todas as famílias como fallback...');
          familias = await database.getAllFamilias();
        }
        setTotalFamilias(familias.length);
        
        // Criar atualizações recentes baseadas nas famílias mais recentes
        const recentFamilies = familias
          .sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 3)
          .map((familia): RecentUpdate => ({
            id: familia.id,
            familyName: familia.nome,
            description: `Nova família cadastrada`,
            createdAt: familia.createdAt,
            type: 'cadastro'
          }));

        setRecentUpdates(recentFamilies);
        
        // Simular necessidades urgentes 
        // Gerar coleção de necessidades no Firebase e implementar a logica de busca aqui
        setNecessidadesUrgentes(Math.floor(Math.random() * 10)); // Temporário
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setTotalFamilias(0);
        setRecentUpdates([]);
        setNecessidadesUrgentes(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const formatDate = (timestamp: any): string => {
    if (!timestamp) return 'Data não disponível';
    
    try {
      let date: Date;
      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else {
        date = new Date(timestamp);
      }
      
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Bem-vindo</Title>
        
        <SectionTitle>Resumo</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="people" size={20} color="#F87060" /> 
              Famílias cadastradas: {loading ? '...' : totalFamilias}
            </CardInfo>
            <CardInfo>
              <Ionicons name="alert-circle" size={20} color="#F87060" /> 
              Necessidades urgentes: {loading ? '...' : necessidadesUrgentes}
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
        {loading ? (
          <CardContainer>
            <CardBody>
              <CardInfo>Carregando atualizações...</CardInfo>
            </CardBody>
          </CardContainer>
        ) : recentUpdates.length === 0 ? (
          <CardContainer>
            <CardBody>
              <CardInfo>Nenhuma atualização recente. Cadastre sua primeira família!</CardInfo>
            </CardBody>
          </CardContainer>
        ) : (
          recentUpdates.map(update => (
            <CardContainer key={update.id}>
              <CardBody>
                <CardInfo>{update.description}</CardInfo>
                <CardInfo>
                  <Ionicons name="time" size={16} color="#666" /> {formatDate(update.createdAt)}
                </CardInfo>
              </CardBody>
            </CardContainer>
          ))
        )}
      </ScrollView>
    </Container>
  );
}