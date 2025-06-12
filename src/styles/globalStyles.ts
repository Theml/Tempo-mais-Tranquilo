import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

// Tipos auxiliares para props extras
type ButtonContainerProps = {
  secondary?: boolean;
  disabled?: boolean;
};

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: "#f8f9fa";
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: "#007bff";
  margin-bottom: 20px;
  text-align: center;
`;

export const Input = styled.TextInput`
  height: 50px;
  border-width: 1px;
  border-color: "#dee2e6";
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fff;
`;

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  background-color: "#6c757d" || "#007bff";
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;