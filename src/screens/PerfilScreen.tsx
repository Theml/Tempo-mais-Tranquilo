import React from 'react';
import { ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import {
  Avatar,
  Container,
  PrimaryButton,
  ProfileHeader,
  SecondaryButton,
  Section,
  SectionTitle,
  UserEmail,
  UserInfo,
  UserName,
  UserRole,
} from '../components/UI';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type PerfilScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface PerfilScreenProps {
  navigation: PerfilScreenNavigationProp;
}

export default function PerfilScreen({ navigation }: PerfilScreenProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ProfileHeader>
          <Avatar source={user.avatar ? { uri: user.avatar } : undefined}
          />
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <UserRole>{user.role || 'voluntario'}</UserRole>
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
          onPress={async () => {
            await logout();
            navigation.replace('Login');
          }}
          icon="log-out"
        />
      </ScrollView>
    </Container>
  );
}
