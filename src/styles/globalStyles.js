import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

export const Input = styled.TextInput`
  height: 50px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fff;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme, secondary }) => 
    secondary ? theme.colors.secondary : theme.colors.primary};
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