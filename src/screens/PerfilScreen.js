import React from 'react';
import { View, Image } from 'react-native';
import { PrimaryButton, SecondaryButton, ScrollView } from '../components/UI';
import styled from 'styled-components/native';

const PerfilScreen = ({ navigation }) => {
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

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 15px;
  border-width: 3px;
  border-color: #F87060;
`;

const UserInfo = styled.View`
  align-items: center;
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const UserEmail = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const UserRole = styled.Text`
  font-size: 14px;
  color: #F87060;
  font-weight: 500;
`;

const Section = styled.View`
  margin-bottom: 25px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export default PerfilScreen;