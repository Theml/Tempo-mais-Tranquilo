import React, { useState, useEffect } from 'react';
import { Alert, ScrollView  } from 'react-native';
import { PrimaryButton, FormInput, ChangePictureButton, ChangePictureText, Container, FormSection, ProfilePicture, ProfilePictureContainer, SecondaryButton} from '../components/UI';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { database } from '../services/database';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/index';

type EditPerfilScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditPerfil'>;
};

export default function EditPerfilScreen({ navigation }: EditPerfilScreenProps) {
   const { user, setSessionUser } = useAuth();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    profissao: '',
    organizacao: '',
    avatar: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        nome: user.name || '',
        email: user.email || '',
        telefone: user.phone || '',
        profissao: user.profession || '',
        organizacao: user.organization || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      handleChange('avatar', result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      const updated = await database.updateUser(user.id, form);
      await setSessionUser(updated); // Atualiza o contexto
      Alert.alert('Sucesso', 'Perfil atualizado!');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao salvar');
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ProfilePictureContainer>
          <ProfilePicture source={form.avatar ? { uri: form.avatar } : undefined} />
          <ChangePictureButton onPress={pickImage}>
            <ChangePictureText>Alterar Foto</ChangePictureText>
          </ChangePictureButton>
        </ProfilePictureContainer>

        <FormSection>
          <FormInput label="Nome" value={form.nome} onChangeText={text => handleChange('nome', text)} icon="person" />
          <FormInput label="Email" value={form.email} onChangeText={text => handleChange('email', text)} icon="mail" />
          <FormInput label="Telefone" value={form.telefone} onChangeText={text => handleChange('telefone', text)} icon="call" />
          <FormInput label="Profissão" value={form.profissao} onChangeText={text => handleChange('profissao', text)} icon="briefcase" />
          <FormInput label="Organização" value={form.organizacao} onChangeText={text => handleChange('organizacao', text)} icon="business" />
        </FormSection>

        <PrimaryButton title="Salvar Alterações" onPress={handleSave} icon="save" />
        <SecondaryButton title="Cancelar" onPress={() => navigation.goBack()} icon="close" />
      </ScrollView>
    </Container>
  );
}