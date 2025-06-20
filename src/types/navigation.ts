import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './index';

// Tipos para as props de navegação das telas
export type NecessidadeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Necessidade'
>;

export type NecessidadeScreenRouteProp = RouteProp<
  RootStackParamList,
  'Necessidade'
>;

export interface NecessidadeScreenProps {
  navigation: NecessidadeScreenNavigationProp;
  route: NecessidadeScreenRouteProp;
}