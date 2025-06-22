export interface User {
  id: string;
  name: string;
  senha: string;
  email: string;
  phone: string;
  role: string;
  profession?: string;
  organization?: string;
  avatar?: string;
}

export interface Membro {
  nome: string;
  idade: string;
  parentesco: string;
}

export interface Family {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  vulnerabilidades: string;
  necessidades: string;
  membros: Membro[];
  responsavel: string;
  lastVisit?: Date | any;
  createdAt: Date | any;
  updatedAt: Date | any;
  createdBy?: string;
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
  Necessidade: { familyId: string }; // familyId é obrigatório
  AlterarSenha: undefined;
  RecuperarSenha: undefined;
  Visitas: undefined;
  FamiliasAcompanhadas: undefined;
};

// Definição dos tipos para as tabs
export type TabParamList = {
  'Início': undefined;
  'Famílias': undefined;
  'Perfil': undefined;
};