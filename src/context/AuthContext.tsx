import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/auth';
import { Alert } from 'react-native';

// Constantes para as chaves do AsyncStorage
const STORAGE_KEYS = {
  USER: '@auth:user',
  TOKEN: '@auth:token',
} as const;

// Tipos mais específicos
interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  [key: string]: any; // Para dados adicionais
}

interface AuthError {
  code: string;
  message: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, additionalData?: Record<string, any>) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Contexto com valores padrão mais seguros
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider do contexto
export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para salvar usuário no AsyncStorage
  const saveUserToStorage = async (userData: User | null): Promise<void> => {
    try {
      if (userData) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (error) {
      console.error('Erro ao salvar usuário no storage:', error);
    }
  };

  // Função para carregar usuário do AsyncStorage
  const loadUserFromStorage = async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao carregar usuário do storage:', error);
      return null;
    }
  };

  // Função para tratar erros de autenticação
  const handleAuthError = (error: any): void => {
    const authError = error as AuthError;
    let message = 'Ocorreu um erro inesperado';

    // Personalizar mensagens baseadas no código do erro
    switch (authError.code) {
      case 'auth/user-not-found':
        message = 'Usuário não encontrado';
        break;
      case 'auth/wrong-password':
        message = 'Senha incorreta';
        break;
      case 'auth/email-already-in-use':
        message = 'Este email já está em uso';
        break;
      case 'auth/weak-password':
        message = 'A senha deve ter pelo menos 6 caracteres';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido';
        break;
      case 'auth/network-request-failed':
        message = 'Erro de conexão. Verifique sua internet';
        break;
      default:
        message = authError.message || 'Erro de autenticação';
    }

    Alert.alert('Erro', message);
  };

  // Inicialização do contexto
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Primeiro, tenta carregar do AsyncStorage
        const storedUser = await loadUserFromStorage();
        if (storedUser) {
          setUser(storedUser);
        }

        // Depois, configura o listener do Firebase Auth
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
          if (firebaseUser) {
            const userData: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            };
            
            setUser(userData);
            await saveUserToStorage(userData);
          } else {
            setUser(null);
            await saveUserToStorage(null);
          }
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Erro na inicialização da autenticação:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Função de login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await auth.signInWithEmailAndPassword(email, password) as { user: User };
      
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };

      setUser(userData);
      await saveUserToStorage(userData);
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função de registro
  const register = async (
    email: string, 
    password: string, 
    additionalData?: Record<string, any>
  ): Promise<User> => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await auth.createUserWithEmailAndPassword(email, password) as { user: User };
      
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        ...additionalData,
      };

      setUser(userData);
      await saveUserToStorage(userData);
      
      return userData;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await auth.signOut();
      setUser(null);
      await saveUserToStorage(null);
      
      // Opcional: limpar outros dados relacionados à sessão
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar dados do usuário
  const refreshUser = async (): Promise<void> => {
    try {
      const currentUser = await auth.getCurrentUser();
      if (currentUser) {
        // Se houver um método para recarregar o usuário, chame-o aqui
        // await currentUser.reload(); // Remova ou adapte conforme necessário

        const userData: User = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        setUser(userData);
        await saveUserToStorage(userData);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};