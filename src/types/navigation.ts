import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Tipos para as props de navegação das telas
export type NecessidadeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NecessidadeScreen'
>;

export type NecessidadeScreenRouteProp = RouteProp<
  RootStackParamList,
  'NecessidadeScreen'
>;

export interface NecessidadeScreenProps {
  navigation: NecessidadeScreenNavigationProp;
  route: NecessidadeScreenRouteProp;
}