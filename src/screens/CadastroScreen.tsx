import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { PrimaryButton, FormInput, Container, FormSection, LoginLink, LoginLinkText, RadioButton, RadioGroup, RadioText, SectionTitle, Title } from '../components/UI';

import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  // Adicione outras rotas aqui se necessário
};

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface CadastroScreenProps {
  navigation: CadastroScreenNavigationProp;
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: 'voluntario', // ou 'assistente'
  });

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.senha !== form.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Criar Conta</Title>
        
        <FormSection>
          <FormInput
            label="Nome Completo"
            placeholder="Digite seu nome"
            value={form.nome}
            onChangeText={(text) => handleChange('nome', text)}
            icon="person"
          />
          
          <FormInput
            label="Email"
            placeholder="Digite seu email"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            icon="mail"
            keyboardType="email-address"
          />
          
          <FormInput
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChangeText={(text) => handleChange('telefone', text)}
            icon="call"
            keyboardType="phone-pad"
          />
        </FormSection>
        
        <FormSection>
          <FormInput
            label="Senha"
            placeholder="Digite sua senha"
            value={form.senha}
            onChangeText={(text) => handleChange('senha', text)}
            secureTextEntry
            icon="lock-closed"
            style={{ color: '#000'}}
          />
          
          <FormInput
            label="Confirmar Senha"
            placeholder="Digite novamente sua senha"
            value={form.confirmarSenha}
            onChangeText={(text) => handleChange('confirmarSenha', text)}
            secureTextEntry
            icon="lock-closed"
            style={{ color: '#000'}}
          />
        </FormSection>
        
        <FormSection>
          <SectionTitle>Tipo de Conta</SectionTitle>
          <RadioGroup>
            <RadioButton
              selected={form.tipoUsuario === 'voluntario'}
              onPress={() => handleChange('tipoUsuario', 'voluntario')}
            >
              <RadioText>Sou Voluntário</RadioText>
            </RadioButton>
            
            <RadioButton
              selected={form.tipoUsuario === 'assistente'}
              onPress={() => handleChange('tipoUsuario', 'assistente')}
            >
              <RadioText>Sou Assistente Social</RadioText>
            </RadioButton>
          </RadioGroup>
        </FormSection>
        
        <PrimaryButton 
          title="Cadastrar" 
          onPress={handleSubmit}
          icon="person-add"
        />
        
        <LoginLink onPress={() => navigation.navigate('Login')}>
          <LoginLinkText>Já tem uma conta? Faça login</LoginLinkText>
        </LoginLink>
      </ScrollView>
    </Container>
  );
};

export default CadastroScreen