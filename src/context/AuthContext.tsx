import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/auth';
import { database } from '../services/database';

// Tipos
interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  [key: string]: any;
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
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
  getUserData: () => Promise<any>;
}

// Contexto com valores padrão
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

  // Função para tratar erros de autenticação
  const handleAuthError = (error: any): void => {
    console.error('Auth Error:', error);
    
    let message = 'Ocorreu um erro inesperado';
    
    if (typeof error === 'string') {
      message = error;
    } else if (error?.message) {
      message = error.message;
    }

    Alert.alert('Erro', message);
  };

  // Inicialização do contexto
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Buscar dados adicionais do usuário do Firestore
          const additionalData = await authService.getUserData(firebaseUser.uid);
          
          const userData: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            ...additionalData, // Incluir dados adicionais do Firestore
          };
          
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao processar mudança de estado de autenticação:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Função de login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      await authService.signInWithEmailAndPassword(email, password);
      // O onAuthStateChanged será chamado automaticamente
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
      const { user: firebaseUser } = await authService.createUserWithEmailAndPassword(
        email, 
        password, 
        additionalData
      );
      
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        ...additionalData,
      };
      
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
      await authService.signOut();
      // O onAuthStateChanged será chamado automaticamente
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
      if (!user) return;
      
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        // Recarregar dados do Firestore
        const additionalData = await authService.getUserData(currentUser.uid);
        
        const userData: User = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          ...additionalData,
        };
        
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  // Função para atualizar perfil do usuário
  const updateUserProfile = async (displayName?: string, photoURL?: string): Promise<void> => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      await authService.updateProfile(displayName, photoURL);
      
      // Atualizar estado local
      setUser(prev => prev ? {
        ...prev,
        displayName: displayName || prev.displayName,
        photoURL: photoURL || prev.photoURL,
      } : null);
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  };

  // Função para obter dados completos do usuário
  const getUserData = async (): Promise<any> => {
    try {
      if (!user) return null;
      return await authService.getUserData(user.uid);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
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
    updateUserProfile,
    getUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};