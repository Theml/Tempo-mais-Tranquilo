import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { db } from './firebase';
import { database } from './database';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const USER_KEY = '@tempo:user';

export const authService = {
  async login(userId: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    const user = { id: userDoc.id, ...userDoc.data() } as User;
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(USER_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    const stored = await AsyncStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  async setCurrentUser(user: User): Promise<void> {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async loginWithEmailAndPassword(email: string, password: string): Promise<User> {
    // Busca usuário pelo email
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error('Usuário não encontrado');
    const userDoc = querySnapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() } as User;
    // Verifica senha (simples, sem hash)
    if (!user.senha || user.senha !== password) throw new Error('Senha incorreta');
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  async register(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser = await database.addUser(data);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return newUser;
  },
};
