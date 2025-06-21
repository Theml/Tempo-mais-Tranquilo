import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/auth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
  setSessionUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser().then(setUser).finally(() => setLoading(false));
  }, []);

  const login = async (userId: string): Promise<void> => {
    try {
      const foundUser = await authService.login(userId);
      if (!foundUser) throw new Error('Usuário não encontrado');
      setUser(foundUser);
    } catch (error) {
      let errorMessage = 'Erro ao fazer login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Erro', errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const setSessionUser = async (user: User) => {
    await authService.setCurrentUser(user);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setSessionUser }}>
      {children}
    </AuthContext.Provider>
  );
};
