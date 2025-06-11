import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { PrimaryButton, FormInput, ScrollView } from '../components/UI';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';

const EditPerfilScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    nome: 'Maria Oliveira',
    email: 'maria@exemplo.com',
    telefone: '(11) 98765-4321',
    profissao: 'Assistente Social',
    organizacao: 'CRAS Centro',
    avatar: require(''),
  });

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('avatar', { uri: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ProfilePictureContainer>
          <ProfilePicture source={form.avatar} />
          <ChangePictureButton onPress={pickImage}>
            <ChangePictureText>Alterar Foto</ChangePictureText>
          </ChangePictureButton>
        </ProfilePictureContainer>
        
        <FormSection>
          <FormInput
            label="Nome Completo"
            value={form.nome}
            onChangeText={(text) => handleChange('nome', text)}
            icon="person"
          />
          
          <FormInput
            label="Email"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            icon="mail"
            keyboardType="email-address"
            editable={false}
          />
          
          <FormInput
            label="Telefone"
            value={form.telefone}
            onChangeText={(text) => handleChange('telefone', text)}
            icon="call"
            keyboardType="phone-pad"
          />
        </FormSection>
        
        <FormSection>
          <FormInput
            label="Profissão"
            value={form.profissao}
            onChangeText={(text) => handleChange('profissao', text)}
            icon="briefcase"
          />
          
          <FormInput
            label="Organização"
            value={form.organizacao}
            onChangeText={(text) => handleChange('organizacao', text)}
            icon="business"
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

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

const ProfilePictureContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 3px;
  border-color: #F87060;
`;

const ChangePictureButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

const ChangePictureText = styled.Text`
  color: #F87060;
  font-weight: 500;
`;

const FormSection = styled.View`
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
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

export default EditPerfilScreen;