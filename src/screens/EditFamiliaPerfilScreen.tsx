import React, { useEffect, useState } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import {
  PrimaryButton,
  FormInput,
  Container,
  FormSection,
  SectionTitle,
  Title,
  SecondaryButton
} from '../components/UI';
import { database } from '../services/database';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Member } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'EditFamiliaPerfil'>;
  route: RouteProp<RootStackParamList, 'EditFamiliaPerfil'>;
};

export default function EditFamiliaPerfilScreen({ navigation, route }: Props) {
  const { family } = route.params;

  const [form, setForm] = useState<{
  nome: string;
  endereco: string;
  telefone: string;
  vulnerabilidades: string;
  necessidades: string;
  membros: Member[];
}>({
  nome: '',
  endereco: '',
  telefone: '',
  vulnerabilidades: '',
  necessidades: '',
  membros: [],
});

  useEffect(() => {
    if (family) {
      setForm({
        nome: family.name || '',
        endereco: family.address || '',
        telefone: family.phone || '',
        vulnerabilidades: family.vulnerabilities || '',
        necessidades: family.needs || '',
        membros: family.members || [],
      });
    }
  }, [family]);

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMembroChange = (index: number, field: string, value: string) => {
    setForm(prev => {
      const membros = [...prev.membros];
      membros[index] = { ...membros[index], [field]: value };
      return { ...prev, membros };
    });
  };

  const addMembro = () => {
    setForm(prev => ({
      ...prev,
      membros: [...prev.membros, { nome: '', idade: '', parentesco: '' }]
    }));
  };

  const removeMembro = (index: number) => {
    setForm(prev => ({
      ...prev,
      membros: prev.membros.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      await database.updateFamilia(family.id, form);
      Alert.alert('Sucesso', 'Família atualizada com sucesso!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao salvar');
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Editar Família</Title>

        <FormSection>
          <SectionTitle>Informações</SectionTitle>
          <FormInput label="Nome" value={form.nome} onChangeText={text => handleChange('nome', text)} icon="people" />
          <FormInput label="Endereço" value={form.endereco} onChangeText={text => handleChange('endereco', text)} icon="location" />
          <FormInput label="Telefone" value={form.telefone} onChangeText={text => handleChange('telefone', text)} icon="call" />
        </FormSection>

        <FormSection>
          <SectionTitle>Situação</SectionTitle>
          <FormInput label="Vulnerabilidades" value={form.vulnerabilidades} onChangeText={text => handleChange('vulnerabilidades', text)} icon="warning" multiline />
          <FormInput label="Necessidades" value={form.necessidades} onChangeText={text => handleChange('necessidades', text)} icon="help-circle" multiline />
        </FormSection>

        <FormSection>
          <SectionTitle>Membros da Família</SectionTitle>
          {form.membros.map((m, idx) => (
            <View key={idx}>
              <FormInput label={`Nome do Membro ${idx + 1}`} value={m.nome} onChangeText={text => handleMembroChange(idx, 'nome', text)} icon="person" />
              <FormInput label="Idade" value={m.idade} onChangeText={text => handleMembroChange(idx, 'idade', text)} icon="calendar" keyboardType="numeric" />
              <FormInput label="Parentesco" value={m.parentesco} onChangeText={text => handleMembroChange(idx, 'parentesco', text)} icon="people" />
            </View>
          ))}
          <PrimaryButton title="Adicionar Membro" onPress={addMembro} icon="add" />
        </FormSection>

        <PrimaryButton title="Salvar" onPress={handleSave} icon="save" />
        <SecondaryButton title="Cancelar" onPress={() => navigation.goBack()} icon="close" />
      </ScrollView>
    </Container>
  );
}
