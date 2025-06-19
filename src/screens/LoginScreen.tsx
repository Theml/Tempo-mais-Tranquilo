import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { PrimaryButton, SecondaryButton, FormInput, Container, ForgotPassword, ForgotPasswordText, Logo, ScrollContent, Title } from '../components/UI';

import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  RecuperarSenha: undefined;
  Home: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <Container>
        <ScrollContent>
          <Logo source={require('')} />
            <Title>Bem-vindo ao Tempo + Tranquilo</Title>
            
            <FormInput
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            icon="mail"
            keyboardType="email-address"
            />
            
            <FormInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed"
            keyboardType="default"
            />
            
            <PrimaryButton 
            title="Entrar" 
            onPress={() => {
              // Simulação de autenticação
              const isAuthenticated = email === 'usuario@teste.com' && password === '123456';
              if (isAuthenticated) {
              navigation.navigate('Home');
              } else {
              // Aqui você pode exibir um alerta de erro
              // Exemplo: Alert.alert('Erro', 'Email ou senha inválidos');
              }
            }} 
            icon="log-in"
            />
            
            <SecondaryButton 
            title="Criar nova conta" 
            onPress={() => navigation.navigate('Cadastro')}
            />
          <ForgotPassword onPress={() => navigation.navigate('RecuperarSenha')}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </ScrollContent>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;