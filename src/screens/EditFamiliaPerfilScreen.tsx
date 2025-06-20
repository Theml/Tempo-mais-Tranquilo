import React, { useState } from 'react';
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
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/index';

type EditFamiliaPerfilScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditFamiliaPerfil'>;
};

export default function EditFamiliaPerfilScreen({ navigation }: EditFamiliaPerfilScreenProps) {
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    vulnerabilidades: '',
    necessidades: '',
    membros: [] as { nome: string; idade: string; parentesco: string }[],
  });

  // Para adicionar um novo membro
  const addMembro = () => {
    setForm(prev => ({
      ...prev,
      membros: [...prev.membros, { nome: '', idade: '', parentesco: '' }]
    }));
  };

  // Para alterar dados de um membro específico
  const handleMembroChange = (index: number, field: string, value: string) => {
    setForm(prev => {
      const membros = [...prev.membros];
      membros[index] = { ...membros[index], [field]: value };
      return { ...prev, membros };
    });
  };

  // Para remover um membro
  const removeMembro = (index: number) => {
    setForm(prev => {
      const membros = prev.membros.filter((_, i) => i !== index);
      return { ...prev, membros };
    });
  };

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Passe o ID correto da família no lugar de ''
    await database.updateFamilia('', {
      nome: form.nome,
      endereco: form.endereco,
      telefone: form.telefone,
      vulnerabilidades: form.vulnerabilidades,
      necessidades: form.necessidades,
      membros: form.membros,
    });
    Alert.alert('Sucesso', 'Perfil da família atualizado com sucesso!');
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Editar Perfil da Família</Title>
        
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
          <SectionTitle>Situação</SectionTitle>
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
        </FormSection>

        <FormSection>
          <SectionTitle>Membros da Família</SectionTitle>
          {form.membros.map((membro, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <FormInput
                label={`Nome do Membro #${idx + 1}`}
                placeholder="Nome"
                value={membro.nome}
                onChangeText={(text) => handleMembroChange(idx, 'nome', text)}
                icon="person"
              />
              <FormInput
                label={`Idade do Membro #${idx + 1}`}
                placeholder="Idade"
                value={membro.idade}
                onChangeText={(text) => handleMembroChange(idx, 'idade', text)}
                icon="calendar"
                keyboardType="numeric"
              />
              <FormInput
                label={`Parentesco do Membro #${idx + 1}`}
                placeholder="Parentesco"
                value={membro.parentesco}
                onChangeText={(text) => handleMembroChange(idx, 'parentesco', text)}
                icon="people"
              />
            </View>
          ))}
          <PrimaryButton 
            title="Adicionar Membro" 
            onPress={addMembro}
            icon="add"
          />
        </FormSection>
        
        <PrimaryButton 
          title="Salvar Alterações" 
          onPress={handleSave}
          icon="save"
        />
        
        <SecondaryButton 
          title="Cancelar" 
          onPress={() => navigation.goBack()}
          icon="close"
        />
      </ScrollView>
    </Container>
  );
};