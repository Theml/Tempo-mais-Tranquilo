import React, { useState } from 'react';
import { Alert } from 'react-native';
import { 
  Container, 
  Title, 
  PrimaryButton, 
  FormInput, 
  Description,
  ScrollContent
} from '../components/UI';

const RecuperarSenhaScreen = () => {
  const [email, setEmail] = useState('');

  const handleRecover = () => {
    Alert.alert('Sucesso', `Um e-mail foi enviado para ${email} com instruções para redefinir sua senha.`);
  };

  return (
    <Container>
      <ScrollContent>
        <Title>Recuperar Senha</Title>
        <Description>
          Digite seu e-mail cadastrado para receber as instruções de recuperação de senha.
        </Description>
        
        <FormInput
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          icon="mail"
          keyboardType="email-address"
        />
        
        <PrimaryButton 
          title="Enviar Instruções" 
          onPress={handleRecover}
          icon="send"
        />
      </ScrollContent>
    </Container>
  );
};

export default RecuperarSenhaScreen;