import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { PrimaryButton, FormInput } from '../components/UI';
import styled from 'styled-components/native';

const CadastroFamiliaScreen = () => {
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    vulnerabilidades: '',
    necessidades: '',
    membros: '',
  });

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Cadastrar Família</Title>
        
        <FormSection>
          <SectionTitle>Informações Básicas</SectionTitle>
          <FormInput
            label="Nome da Família"
            placeholder="Ex: Família Silva"
            value={form.nome}
            onChangeText={(text) => handleChange('nome', text)}
            icon="people"
          />
          
          <FormInput
            label="Endereço"
            placeholder="Rua, número, bairro"
            value={form.endereco}
            onChangeText={(text) => handleChange('endereco', text)}
            icon="location"
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
          <SectionTitle>Situação de Vulnerabilidade</SectionTitle>
          <FormInput
            label="Vulnerabilidades"
            placeholder="Ex: Desemprego, doença, etc."
            value={form.vulnerabilidades}
            onChangeText={(text) => handleChange('vulnerabilidades', text)}
            icon="warning"
            multiline
          />
          
          <FormInput
            label="Necessidades Imediatas"
            placeholder="Ex: Alimentos, remédios, etc."
            value={form.necessidades}
            onChangeText={(text) => handleChange('necessidades', text)}
            icon="help-circle"
            multiline
          />
          
          <FormInput
            label="Número de Membros"
            placeholder="Quantidade de pessoas na família"
            value={form.membros}
            onChangeText={(text) => handleChange('membros', text)}
            icon="person"
            keyboardType="numeric"
          />
        </FormSection>
        
        <PrimaryButton 
          title="Cadastrar Família" 
          onPress={() => Alert.alert('Cadastro', 'Família cadastrada com sucesso!')}
          icon="save"
        />
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const FormSection = styled.View`
  margin-bottom: 25px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #F87060;
  margin-bottom: 15px;
`;

export default CadastroFamiliaScreen;