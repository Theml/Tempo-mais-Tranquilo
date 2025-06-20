import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { PrimaryButton, FormInput, Container, FormSection, LoginLink, LoginLinkText, RadioButton, RadioGroup, RadioText, SectionTitle, Title } from '../components/UI';

import { authService } from 'src/services/auth';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/index';

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

interface CadastroScreenProps {
  navigation: CadastroScreenNavigationProp;
}

export default function CadastroScreen({ navigation }: CadastroScreenProps) {
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

  const handleSubmit = async () => {
  if (form.senha !== form.confirmarSenha) {
    Alert.alert('Erro', 'As senhas não coincidem');
    return;
  }
  try {
    await authService.createUserWithEmailAndPassword(
      form.email,
      form.senha,
      {
        nome: form.nome,
        telefone: form.telefone,
        tipo: form.tipoUsuario,
      }
    );
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Erro', error.message || String(error));
    }
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
          />
          
          <FormInput
            label="Confirmar Senha"
            placeholder="Digite novamente sua senha"
            value={form.confirmarSenha}
            onChangeText={(text) => handleChange('confirmarSenha', text)}
            secureTextEntry
            icon="lock-closed"
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