import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { PrimaryButton, FormInput } from '../components/UI';
import styled from 'styled-components/native';

const CadastroScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: 'voluntario', // ou 'assistente'
  });

  const handleChange = (name, value) => {
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
            autoCapitalize="none"
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

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const FormSection = styled.View`
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #666;
  margin-bottom: 15px;
`;

const RadioGroup = styled.View`
  margin-top: 10px;
`;

const RadioButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: ${props => props.selected ? '#F8706033' : '#f8f9fa'};
  border: 1px solid ${props => props.selected ? '#F87060' : '#ddd'};
`;

const RadioText = styled.Text`
  margin-left: 10px;
  color: #333;
`;

const LoginLink = styled.TouchableOpacity`
  align-self: center;
  margin-top: 20px;
`;

const LoginLinkText = styled.Text`
  color: #F87060;
  font-weight: 500;
`;

export default CadastroScreen