import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/auth';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert('Erro', error.message);
      throw error;
    }
  };

  const register = async (email, password, additionalData) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile(additionalData);
      return user;
    } catch (error) {
      Alert.alert('Erro', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      Alert.alert('Erro', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};