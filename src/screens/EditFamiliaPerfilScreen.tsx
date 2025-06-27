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
import { RootStackParamList, Family, Membro } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'EditFamiliaPerfil'>;
  route: RouteProp<RootStackParamList, 'EditFamiliaPerfil'>;
};

export default function EditFamiliaPerfilScreen({ navigation, route }: Props) {
  const { family } = route.params;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<{
    nome: string;
    endereco: string;
    telefone: string;
    vulnerabilidades: string;
    necessidades: string;
    membros: Membro[];
    responsavel: string;
  }>({
    nome: '',
    endereco: '',
    telefone: '',
    vulnerabilidades: '',
    necessidades: '',
    membros: [], // Sempre inicializar como array vazio
    responsavel: '',
  });

  useEffect(() => {
    if (family) {
      console.log('Dados da família recebidos:', family);
      
      // Função auxiliar para garantir que sempre temos um array
      const ensureArray = (value: any): Membro[] => {
        if (Array.isArray(value)) return value;
        if (typeof value === 'string' && value.trim()) {
          // Se for uma string com números, converter para array de membros básicos
          try {
            const num = parseInt(value);
            if (!isNaN(num)) {
              return Array.from({ length: num }, (_, i) => ({
                nome: '',
                idade: '',
                parentesco: ''
              }));
            }
          } catch (e) {
            console.log('Erro ao converter membros:', e);
          }
        }
        return [];
      };

      setForm({
        nome: family.nome || '',
        endereco: family.endereco || '',
        telefone: family.telefone || '',
        vulnerabilidades: family.vulnerabilidades || '',
        necessidades: family.necessidades || '',
        membros: ensureArray(family.membros),
        responsavel: family.responsavel || '',
      });
    }
  }, [family]);

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMembroChange = (index: number, field: keyof Membro, value: string) => {
    setForm(prev => {
      const membros = [...prev.membros];
      if (membros[index]) {
        membros[index] = { ...membros[index], [field]: value };
      }
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
    Alert.alert(
      'Confirmar Remoção',
      'Tem certeza que deseja remover este membro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setForm(prev => ({
              ...prev,
              membros: prev.membros.filter((_, i) => i !== index),
            }));
          }
        }
      ]
    );
  };

  const validateForm = (): boolean => {
    if (!form.nome.trim()) {
      Alert.alert('Erro', 'Nome da família é obrigatório');
      return false;
    }
    if (!form.endereco.trim()) {
      Alert.alert('Erro', 'Endereço é obrigatório');
      return false;
    }
    if (!form.telefone.trim()) {
      Alert.alert('Erro', 'Telefone é obrigatório');
      return false;
    }
    if (!form.responsavel.trim()) {
      Alert.alert('Erro', 'Responsável é obrigatório');
      return false;
    }

    // Validar membros
    for (let i = 0; i < form.membros.length; i++) {
      const member = form.membros[i];
      if (!member.nome.trim()) {
        Alert.alert('Erro', `Nome do membro ${i + 1} é obrigatório`);
        return false;
      }
      if (!member.idade.trim()) {
        Alert.alert('Erro', `Idade do membro ${i + 1} é obrigatória`);
        return false;
      }
      if (!member.parentesco.trim()) {
        Alert.alert('Erro', `Parentesco do membro ${i + 1} é obrigatório`);
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Preparar dados para atualização - usar os nomes corretos dos campos
      const updateData: Partial<Family> = {
        nome: form.nome.trim(),
        endereco: form.endereco.trim(),
        telefone: form.telefone.trim(),
        vulnerabilidades: form.vulnerabilidades.trim(),
        necessidades: form.necessidades.trim(),
        membros: form.membros,
        responsavel: form.responsavel.trim(),
      };

      console.log('Atualizando família com dados:', updateData);
      
      const updatedFamily = await database.updateFamilia(family.id, updateData);
      
      console.log('Família atualizada:', updatedFamily);
      
      Alert.alert(
        'Sucesso', 
        'Família atualizada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navegar de volta para o perfil com os dados atualizados
              navigation.navigate('FamiliaPerfil', { family: updatedFamily });
            }
          }
        ]
      );
    } catch (error: any) {
      console.error('Erro ao atualizar família:', error);
      Alert.alert('Erro', error.message || 'Erro ao salvar alterações');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Editar Família</Title>

        <FormSection>
          <SectionTitle>Informações Básicas</SectionTitle>
          <FormInput 
            label="Nome da Família" 
            value={form.nome} 
            onChangeText={text => handleChange('nome', text)} 
            icon="people" 
          />
          <FormInput 
            label="Endereço" 
            value={form.endereco} 
            onChangeText={text => handleChange('endereco', text)} 
            icon="location" 
          />
          <FormInput 
            label="Telefone" 
            value={form.telefone} 
            onChangeText={text => handleChange('telefone', text)} 
            icon="call" 
            keyboardType="phone-pad"
          />
          <FormInput 
            label="Responsável" 
            value={form.responsavel} 
            onChangeText={text => handleChange('responsavel', text)} 
            icon="person" 
          />
        </FormSection>

        <FormSection>
          <SectionTitle>Situação da Família</SectionTitle>
          <FormInput 
            label="Vulnerabilidades" 
            value={form.vulnerabilidades} 
            onChangeText={text => handleChange('vulnerabilidades', text)} 
            icon="warning" 
            multiline 
            placeholder="Descreva as vulnerabilidades da família..."
          />
          <FormInput 
            label="Necessidades Atuais" 
            value={form.necessidades} 
            onChangeText={text => handleChange('necessidades', text)} 
            icon="help-circle" 
            multiline 
            placeholder="Descreva as necessidades da família..."
          />
        </FormSection>

        <FormSection>
          <SectionTitle>Membros da Família ({form.membros.length})</SectionTitle>
          {form.membros && form.membros.length > 0 ? (
            form.membros.map((member, index) => (
              <View key={index} style={{ marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
                <FormInput 
                  label={`Nome do Membro ${index + 1}`} 
                  value={member.nome} 
                  onChangeText={text => handleMembroChange(index, 'nome', text)} 
                  icon="person" 
                />
                <FormInput 
                  label="Idade" 
                  value={member.idade} 
                  onChangeText={text => handleMembroChange(index, 'idade', text)} 
                  icon="calendar" 
                  keyboardType="numeric"
                />
                <FormInput 
                  label="Parentesco" 
                  value={member.parentesco} 
                  onChangeText={text => handleMembroChange(index, 'parentesco', text)} 
                  icon="people" 
                  placeholder="Ex: Pai, Mãe, Filho(a), etc."
                />
                
                {form.membros.length > 1 && (
                  <SecondaryButton 
                    title="Remover Membro" 
                    onPress={() => removeMembro(index)} 
                    icon="trash" 
                  />
                )}
              </View>
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Title style={{ color: '#666', fontSize: 14 }}>
                Nenhum membro cadastrado
              </Title>
            </View>
          )}
          
          <PrimaryButton 
            title="Adicionar Membro" 
            onPress={addMembro} 
            icon="add" 
          />
        </FormSection>

        <View style={{ marginTop: 20 }}>
          <PrimaryButton 
            title={loading ? "Salvando..." : "Salvar Alterações"} 
            onPress={handleSave} 
            icon="save" 
          />
          <SecondaryButton 
            title="Cancelar" 
            onPress={() => navigation.goBack()} 
            icon="close" 
          />
        </View>
      </ScrollView>
    </Container>
  );
}