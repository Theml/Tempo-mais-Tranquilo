import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { PrimaryButton, SecondaryButton, FormInput } from '../components/UI';
import styled from 'styled-components/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
  );
};

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const ScrollContent = styled.ScrollView`
  padding: 30px;
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const ForgotPassword = styled.TouchableOpacity`
  align-self: center;
  margin-top: 15px;
`;

const ForgotPasswordText = styled.Text`
  color: #F87060;
  font-weight: 500;
`;

export default LoginScreen;