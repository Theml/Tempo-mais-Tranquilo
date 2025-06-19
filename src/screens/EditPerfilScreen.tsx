import React, { useState } from 'react';
import { Alert, ScrollView  } from 'react-native';
import { PrimaryButton, FormInput, ChangePictureButton, ChangePictureText, Container, FormSection, ProfilePicture, ProfilePictureContainer, SecondaryButton} from '../components/UI';
import * as ImagePicker from 'expo-image-picker';

import type { StackNavigationProp } from '@react-navigation/stack';

type EditPerfilScreenProps = {
  navigation: StackNavigationProp<any>;
};

const EditPerfilScreen: React.FC<EditPerfilScreenProps> = ({ navigation }) => {
  const [form, setForm] = useState({
    nome: 'Maria Oliveira',
    email: 'maria@exemplo.com',
    telefone: '(11) 98765-4321',
    profissao: 'Assistente Social',
    organizacao: 'CRAS Centro',
    avatar: require(''),
  });

  interface FormState {
    nome: string;
    email: string;
    telefone: string;
    profissao: string;
    organizacao: string;
    avatar: any;
  }

  type FormField = keyof FormState;

  const handleChange = (name: FormField, value: any) => {
    setForm((prev: FormState) => ({ ...prev, [name]: value }));
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
            placeholder="Digite seu nome completo"
            value={form.nome}
            onChangeText={(text) => handleChange('nome', text)}
            icon="person"
          />
          
          <FormInput
            label="Email"
            placeholder="Digite seu email"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            icon="mail"
            keyboardType="email-address"
          />
          
          <FormInput
            label="Telefone"
            placeholder="Digite seu telefone"
            value={form.telefone}
            onChangeText={(text) => handleChange('telefone', text)}
            icon="call"
            keyboardType="phone-pad"
          />
        </FormSection>
        
        <FormSection>
          <FormInput
            label="Profissão"
            placeholder="Digite sua profissão"
            value={form.profissao}
            onChangeText={(text) => handleChange('profissao', text)}
            icon="briefcase"
          />
          
          <FormInput
            label="Organização"
            placeholder="Digite sua organização"
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

export default EditPerfilScreen;