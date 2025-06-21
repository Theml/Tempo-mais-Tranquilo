import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { PrimaryButton, FormInput, Container, FormSection, SectionTitle, Title } from '../components/UI';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/index';
import { database } from 'src/services/database';
import { authService } from 'src/services/auth';

type CadastroFamiliaNavigationProps = StackNavigationProp<RootStackParamList, 'CadastroFamilia'>;

interface CadastroFamiliaScreenProps {
  navigation: CadastroFamiliaNavigationProps;
}

export default function CadastroFamiliaScreen({ navigation }:CadastroFamiliaScreenProps ) {
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    vulnerabilidades: '',
    necessidades: '',
    membros: '',
  });

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    if (!form.nome || !form.endereco || !form.telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    await database.addFamilia({
      ...form
    });
    Alert.alert('Sucesso', 'Família cadastrada com sucesso!');
    navigation.goBack();
  }

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
          onPress={() => handleSubmit()}
          icon="save"
        />
      </ScrollView>
    </Container>
  );
};