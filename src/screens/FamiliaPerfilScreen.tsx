import React ,{ useState, useEffect } from 'react';
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

  useEffect(() => {
    if (familyData?.id) {
      database.getFamiliaById(familyData.id).then(data => {
        if (data) setFamilyData(data);
      });
    }
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>{familyData.name}</Title>
        <Description>Cadastrada em: 10/05/2023</Description>
        
        <SectionTitle>Informações Básicas</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="location" size={16} color="#F87060" /> 
              {familyData.address}
            </CardInfo>
            <CardInfo>
              <Ionicons name="call" size={16} color="#F87060" /> 
              {familyData.phone}
            </CardInfo>
            <CardInfo>
              <Ionicons name="people" size={16} color="#F87060" /> 
              {familyData.members}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <SectionTitle>Situação</SectionTitle>
        <CardContainer>
          <CardTitle>Vulnerabilidades</CardTitle>
          <CardBody>
            <CardInfo>{familyData.vulnerabilities}</CardInfo>
          </CardBody>
        </CardContainer>

        <CardContainer>
          <CardTitle>Necessidades Atuais</CardTitle>
          <CardBody>
            <CardInfo>{familyData.needs}</CardInfo>
          </CardBody>
        </CardContainer>

        <SectionTitle>Acompanhamento</SectionTitle>
        <CardContainer>
          <CardBody>
            <CardInfo>
              <Ionicons name="calendar" size={16} color="#F87060" /> 
              Última visita: {familyData.lastVisit ? familyData.lastVisit.toLocaleDateString() : 'Não informado'}
            </CardInfo>
            <CardInfo>
              <Ionicons name="person" size={16} color="#F87060" /> 
              Responsável: {familyData.responsavel}
            </CardInfo>
          </CardBody>
        </CardContainer>

        <PrimaryButton 
          title="Editar Perfil" 
          onPress={() => navigation.navigate('EditFamiliaPerfil', { family: familyData})}
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
};