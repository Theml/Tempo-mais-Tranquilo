import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { PrimaryButton, SecondaryButton, FormInput, Container, ForgotPassword, ForgotPasswordText, Logo, ScrollContent, Title } from '../components/UI';

import { authService } from 'src/services/auth';

import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  RecuperarSenha: undefined;
  Main: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => { 
    if (email === '' || password === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    } 
    try {
      // Corrigido para usar login com email e senha via AsyncStorage
      await authService.loginWithEmailAndPassword(email, password);
      navigation.replace('Main');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      alert(error.message || 'Email ou senha inválidos. Tente novamente.');
    }
  }


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
            onPress={() => { handleLogin() }} 
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