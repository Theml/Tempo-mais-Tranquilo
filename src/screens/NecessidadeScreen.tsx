import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { PrimaryButton, FormInput } from '../components/UI';
import styled from 'styled-components/native';

const NecessidadeScreen = ({ navigation, route }) => {
  const [form, setForm] = useState({
    tipo: 'alimento', // 'alimento', 'vestuario', 'medicamento', 'outros'
    descricao: '',
    quantidade: '',
    urgencia: 'media', // 'baixa', 'media', 'alta'
    observacoes: '',
  });

  const familyId = route.params?.familyId || 1;

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
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
            multiline
            numberOfLines={4}
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
            multiline
            numberOfLines={3}
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
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const RadioButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.small ? '8px 12px' : '12px'};
  margin-bottom: 8px;
  margin-right: ${props => props.horizontal ? '8px' : '0'};
  border-radius: 8px;
  background-color: ${props => props.selected ? '#F8706010' : '#f8f9fa'};
  border: 1px solid ${props => props.selected ? '#F87060' : '#ddd'};
`;

const RadioIcon = styled(Ionicons)`
  color: ${props => props.selected ? '#F87060' : '#666'};
  margin-right: 8px;
`;

const RadioText = styled.Text`
  color: ${props => props.selected ? '#F87060' : '#666'};
`;

const UrgencyIndicator = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${props => props.color};
  margin-right: 10px;
  border: 2px solid ${props => props.selected ? '#333' : 'transparent'};
`;

const SecondaryButton = styled.TouchableOpacity`
  background-color: #6c757d;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
`;

const SecondaryButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;
`;

export default NecessidadeScreen;