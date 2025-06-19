import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type ButtonProps = {
  onPress: () => void;
  title: string;
  icon?: IoniconName;
};

type InputProps = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: IoniconName;
  keyboardType?: string;
  multiline?: boolean;
};

// Botão Primário
export const PrimaryButton: React.FC<ButtonProps> = ({ onPress, title, icon }) => (
  <ButtonContainer onPress={onPress}>
    {icon && <Ionicons name={icon} size={20} color="white" style={{ marginRight: 10 }} />}
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

// Botão Secundário
export const SecondaryButton: React.FC<ButtonProps> = ({ onPress, title }) => (
  <ButtonContainer secondary onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

// Input Field
export const FormInput: React.FC<InputProps> = ({ label, placeholder, value, onChangeText, secureTextEntry, icon }) => (
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
type FamilyCardProps = {
  name: string;
  address: string;
  needs: string;
  onPress: () => void;
};

export const FamilyCard: React.FC<FamilyCardProps> = ({ name, address, needs, onPress }) => (
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
type ButtonContainerProps = {
  secondary?: boolean;
};

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  background-color: ${props => props.secondary ? '#6c757d' : '#F87060'};
  padding: 15px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-vertical: 5px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const InputContainer = styled.View`
  margin-bottom: 15px;
`;

export const InputLabel = styled.Text`
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
`;

export const InputField = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 10px 15px;
  border: 1px solid #ddd;
`;

export const TextInputStyled = styled.TextInput`
  flex: 1;
  height: 40px;
`;

export const CardContainer = styled.TouchableOpacity`
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

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const CardBody = styled.View``;

export const CardInfo = styled.Text`
  color: #666;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const AddButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

type FilterButtonProps = {
  active?: boolean;
};

export const FilterButton = styled.TouchableOpacity<FilterButtonProps>`
  padding: 8px 15px;
  border-radius: 15px;
  background-color: ${props => props.active ? '#F8706020' : 'transparent'};
  margin-right: 10px;
  border: 1px solid ${props => props.active ? '#F87060' : '#ddd'};
`;

export const FilterText = styled.Text<FilterButtonProps>`
  color: ${props => props.active ? '#F87060' : '#666'};
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
`;

export const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 15px;
  border-width: 3px;
  border-color: #F87060;
`;

export const UserInfo = styled.View`
  align-items: center;
`;

export const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

export const UserEmail = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

export const UserRole = styled.Text`
  font-size: 14px;
  color: #F87060;
  font-weight: 500;
`;

export const Section = styled.View`
  margin-bottom: 25px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export const FormSection = styled.View`
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
`;

type RadioGroupProps = {
  horizontal?: boolean;
};

export const RadioGroup = styled.View<RadioGroupProps>`
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

type RadioButtonProps = {
  selected?: boolean;
  horizontal?: boolean;
  small?: boolean;
};

export const RadioButton = styled.TouchableOpacity<RadioButtonProps>`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.small ? '8px 12px' : '12px'};
  margin-bottom: 8px;
  margin-right: ${props => props.horizontal ? '8px' : '0'};
  border-radius: 8px;
  background-color: ${props => props.selected ? '#F8706010' : '#f8f9fa'};
  border: 1px solid ${props => props.selected ? '#F87060' : '#ddd'};
`;

export const RadioIcon = styled(Ionicons)<{ selected?: boolean }>`
  color: ${props => props.selected ? '#F87060' : '#666'};
  margin-right: 8px;
`;

export const RadioText = styled.Text<{ selected?: boolean }>`
  color: ${props => props.selected ? '#F87060' : '#666'};
`;

type UrgencyIndicatorProps = {
  color: string;
  selected?: boolean;
};

export const UrgencyIndicator = styled.View<UrgencyIndicatorProps>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${props => props.color};
  margin-right: 10px;
  border: 2px solid ${props => props.selected ? '#333' : 'transparent'};
`;

export const SecondaryButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;
`;

export const ScrollContent = styled.ScrollView`
  padding: 30px;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
  margin-bottom: 30px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  align-self: center;
  margin-top: 15px;
`;

export const ForgotPasswordText = styled.Text`
  color: #F87060;
  font-weight: 500;
`;

export const LoginLink = styled.TouchableOpacity`
  align-self: center;
  margin-top: 20px;
`;

export const LoginLinkText = styled.Text`
  color: #F87060;
  font-weight: 500;
`;

export const ProfilePictureContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfilePicture = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 3px;
  border-color: #F87060;
`;

export const ChangePictureButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const ChangePictureText = styled.Text`
  color: #F87060;
  font-weight: 500;
`;

export const Description = styled.Text`
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
`;