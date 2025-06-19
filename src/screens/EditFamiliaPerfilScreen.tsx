import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { 
  PrimaryButton, 
  FormInput, 
  Container, 
  FormSection, 
  SectionTitle, 
  Title, 
  SecondaryButton 
} from '../components/UI';

const EditFamiliaPerfilScreen = () => {
  const [form, setForm] = useState({
    nome: 'Família Silva',
    endereco: 'Rua das Flores, 123 - Centro',
    telefone: '(11) 98765-4321',
    vulnerabilidades: 'Desemprego do chefe da família',
    necessidades: 'Cesta básica, material escolar',
    membros: '4',
  });

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    Alert.alert('Sucesso', 'Perfil da família atualizado com sucesso!');
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
          title="Salvar Alterações" 
          onPress={handleSave}
          icon="save"
        />
        
        <SecondaryButton 
          title="Cancelar" 
          onPress={() => console.log("Voltar")}
          icon="close"
        />
      </ScrollView>
    </Container>
  );
};

export default EditFamiliaPerfilScreen;