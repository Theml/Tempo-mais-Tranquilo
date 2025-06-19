import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { PrimaryButton, SecondaryButton, FormInput, Container, ForgotPassword, ForgotPasswordText, Logo, ScrollContent, Title } from '../components/UI';

import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  RecuperarSenha: undefined;
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
          <Title>Bem-vindo ao SocialCare</Title>
          
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
          />
          
          <PrimaryButton 
            title="Entrar" 
            onPress={() => {}} 
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