import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

// Botão Primário
export const PrimaryButton = ({ onPress, title, icon }) => (
  <ButtonContainer onPress={onPress}>
    {icon && <Ionicons name={icon} size={20} color="white" style={{ marginRight: 10 }} />}
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

// Botão Secundário
export const SecondaryButton = ({ onPress, title }) => (
  <ButtonContainer secondary onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

// Input Field
export const FormInput = ({ label, placeholder, value, onChangeText, secureTextEntry, icon }) => (
  <InputContainer>
    {label && <InputLabel>{label}</InputLabel>}
    <InputField>
      {icon && <Ionicons name={icon} size={20} color="#666" style={{ marginRight: 10 }} />}
      <TextInputStyled
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </InputField>
  </InputContainer>
);

// Card de Família/Vulnerabilidade
export const FamilyCard = ({ name, address, needs, onPress }) => (
  <CardContainer onPress={onPress}>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </CardHeader>
    <CardBody>
      <CardInfo><Ionicons name="location" size={16} /> {address}</CardInfo>
      <CardInfo><Ionicons name="alert-circle" size={16} /> {needs}</CardInfo>
    </CardBody>
  </CardContainer>
);

// Estilos dos componentes
const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.secondary ? '#6c757d' : '#F87060'};
  padding: 15px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-vertical: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const InputContainer = styled.View`
  margin-bottom: 15px;
`;

const InputLabel = styled.Text`
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
`;

const InputField = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 10px 15px;
  border: 1px solid #ddd;
`;

const TextInputStyled = styled.TextInput`
  flex: 1;
  height: 40px;
`;

const CardContainer = styled.TouchableOpacity`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CardBody = styled.View``;

const CardInfo = styled.Text`
  color: #666;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;