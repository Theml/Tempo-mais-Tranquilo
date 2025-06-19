import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { PrimaryButton, FormInput, Container, FormSection, RadioButton, RadioGroup, RadioIcon, RadioText, SecondaryButton, SectionTitle, Title, UrgencyIndicator } from '../components/UI';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'NecessidadeScreen'>;

const NecessidadeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [form, setForm] = useState({
    tipo: 'alimento' as 'alimento' | 'vestuario' | 'medicamento' | 'outros',
    descricao: '',
    quantidade: '',
    urgencia: 'media' as 'baixa' | 'media' | 'alta',
    observacoes: '',
  });

  // Agora o familyId é obrigatório nos parâmetros da rota
  const familyId = route.params.familyId;

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Aqui você pode usar o familyId para salvar a necessidade
    console.log('Salvando necessidade para família:', familyId);
    Alert.alert('Sucesso', 'Necessidade registrada com sucesso!');
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Registrar Necessidade</Title>
        
        <FormSection>
          <SectionTitle>Tipo de Necessidade</SectionTitle>
          <RadioGroup horizontal>
            <RadioButton
              selected={form.tipo === 'alimento'}
              onPress={() => handleChange('tipo', 'alimento')}
              small
            >
              <RadioIcon name="fast-food" selected={form.tipo === 'alimento'} />
              <RadioText>Alimento</RadioText>
            </RadioButton>
            
            <RadioButton
              selected={form.tipo === 'vestuario'}
              onPress={() => handleChange('tipo', 'vestuario')}
              small
            >
              <RadioIcon name="shirt" selected={form.tipo === 'vestuario'} />
              <RadioText>Vestuário</RadioText>
            </RadioButton>
            
            <RadioButton
              selected={form.tipo === 'medicamento'}
              onPress={() => handleChange('tipo', 'medicamento')}
              small
            >
              <RadioIcon name="medkit" selected={form.tipo === 'medicamento'} />
              <RadioText>Medicamento</RadioText>
            </RadioButton>
            
            <RadioButton
              selected={form.tipo === 'outros'}
              onPress={() => handleChange('tipo', 'outros')}
              small
            >
              <RadioIcon name="ellipsis-horizontal" selected={form.tipo === 'outros'} />
              <RadioText>Outros</RadioText>
            </RadioButton>
          </RadioGroup>
          
          <FormInput
            label="Descrição Detalhada"
            placeholder="Descreva a necessidade"
            value={form.descricao}
            onChangeText={(text) => handleChange('descricao', text)}
          />
          
          <FormInput
            label="Quantidade"
            placeholder="Ex: 2 cestas básicas, 3 caixas de remédio"
            value={form.quantidade}
            onChangeText={(text) => handleChange('quantidade', text)}
          />
        </FormSection>
        
        <FormSection>
          <SectionTitle>Nível de Urgência</SectionTitle>
          <RadioGroup>
            <RadioButton
              selected={form.urgencia === 'baixa'}
              onPress={() => handleChange('urgencia', 'baixa')}
            >
              <UrgencyIndicator color="#28a745" selected={form.urgencia === 'baixa'} />
              <RadioText>Baixa (pode aguardar 15 dias)</RadioText>
            </RadioButton>
            
            <RadioButton
              selected={form.urgencia === 'media'}
              onPress={() => handleChange('urgencia', 'media')}
            >
              <UrgencyIndicator color="#ffc107" selected={form.urgencia === 'media'} />
              <RadioText>Média (necessário em 1 semana)</RadioText>
            </RadioButton>
            
            <RadioButton
              selected={form.urgencia === 'alta'}
              onPress={() => handleChange('urgencia', 'alta')}
            >
              <UrgencyIndicator color="#dc3545" selected={form.urgencia === 'alta'} />
              <RadioText>Alta (necessário imediatamente)</RadioText>
            </RadioButton>
          </RadioGroup>
        </FormSection>
        
        <FormSection>
          <FormInput
            label="Observações"
            placeholder="Informações adicionais"
            value={form.observacoes}
            onChangeText={(text) => handleChange('observacoes', text)}
          />
        </FormSection>
        
        <PrimaryButton 
          title="Salvar Necessidade" 
          onPress={handleSubmit}
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

export default NecessidadeScreen;