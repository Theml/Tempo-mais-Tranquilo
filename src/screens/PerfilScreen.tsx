import React from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Container, PrimaryButton, ProfileHeader, SecondaryButton, Section, SectionTitle, UserEmail, UserInfo, UserName, UserRole } from '../components/UI';

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  EditPerfil: undefined;
  AlterarSenha: undefined;
  Visitas: undefined;
  FamiliasAcompanhadas: undefined;
  Login: undefined;
};

type PerfilScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface PerfilScreenProps {
  navigation: PerfilScreenNavigationProp;
}

const PerfilScreen: React.FC<PerfilScreenProps> = ({ navigation }) => {
  const user = {
    name: 'João da Silva',
    email: 'joao@exemplo.com',
    role: 'Assistente Social',
    avatar: require('')
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ProfileHeader>
          <Avatar source={user.avatar} />
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <UserRole>{user.role}</UserRole>
          </UserInfo>
        </ProfileHeader>
        
        <Section>
          <SectionTitle>Minha Conta</SectionTitle>
          <SecondaryButton 
            title="Editar Perfil" 
            onPress={() => navigation.navigate('EditPerfil')}
            icon="create"
          />
          <SecondaryButton 
            title="Alterar Senha" 
            onPress={() => navigation.navigate('AlterarSenha')}
            icon="key"
          />
        </Section>
        
        <Section>
          <SectionTitle>Atividades</SectionTitle>
          <SecondaryButton 
            title="Minhas Visitas" 
            onPress={() => navigation.navigate('Visitas')}
            icon="calendar"
          />
          <SecondaryButton 
            title="Famílias Acompanhadas" 
            onPress={() => navigation.navigate('FamiliasAcompanhadas')}
            icon="people"
          />
        </Section>
        
        <PrimaryButton 
          title="Sair" 
          onPress={() => navigation.navigate('Login')}
          icon="log-out"
        />
      </ScrollView>
    </Container>
  );
};

export default PerfilScreen;