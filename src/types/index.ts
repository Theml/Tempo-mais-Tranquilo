export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'voluntario' | 'assistente';
  profession?: string;
  organization?: string;
  avatar?: string;
}

export interface Family {
  id: string;
  name: string;
  address: string;
  phone: string;
  vulnerabilities: string;
  needs: string;
  members: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Need {
  id: string;
  familyId?: string;
  type: 'alimento' | 'vestuario' | 'medicamento' | 'outros';
  description: string;
  quantity: string;
  urgency: 'baixa' | 'media' | 'alta';
  observations?: string;
  createdAt: Date;
  status: 'pendente' | 'atendida' | 'cancelada';
}

// Definição unificada dos tipos de navegação
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Main: undefined;
  Home: undefined;
  Perfil: undefined;
  EditPerfil: undefined;
  FamiliaList: undefined;
  CadastroFamilia: undefined;
  FamiliaPerfil: { family: Family };
  EditFamiliaPerfil: { family: Family };
  NecessidadeScreen: { familyId: string }; // Parâmetro obrigatório
  AlterarSenha: undefined;
  RecuperarSenha: undefined;
};

// Definição dos tipos para as tabs
export type TabParamList = {
  'Início': undefined;
  'Famílias': undefined;
  'Perfil': undefined;
};