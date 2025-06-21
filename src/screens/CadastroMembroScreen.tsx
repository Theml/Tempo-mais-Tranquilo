import { useState } from "react";
import { Alert, ScrollView, Button } from "react-native";
import { Container, FormSection, SectionTitle, Title } from "src/components/UI";
import { database } from "src/services/database";
import { Input } from "src/styles/globalStyles";

export default function CadastroMembroScreen({ navigation, route }: { navigation: any; route: any }) {
    const [form, setForm] = useState({
        nome: '',
        idade: '',
        parentesco: '',
    });
    
    // familyId é obrigatório nos parâmetros da rota
    const { familyId } = route.params;
    
    const handleChange = (name: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async () => {
        await database.addMembro({
        ...form,
        familyId,
        createdAt: new Date(),
        });
        Alert.alert('Sucesso', 'Membro cadastrado com sucesso!');
        navigation.goBack();
    };
    
    return (
        <Container>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Title>Cadastrar Membro</Title>
    
            <FormSection>
            <SectionTitle>Informações do Membro</SectionTitle>
            <Input
                placeholder="Nome"
                value={form.nome}
                onChangeText={value => handleChange('nome', value)}
            />
            <Input
                placeholder="Idade"
                value={form.idade}
                onChangeText={value => handleChange('idade', value)}
                keyboardType="numeric"
            />
            <Input
                placeholder="Parentesco"
                value={form.parentesco}
                onChangeText={value => handleChange('parentesco', value)}
            />
            </FormSection>
    
            <Button title="Cadastrar" onPress={handleSubmit} />
        </ScrollView>
        </Container>
    );
}