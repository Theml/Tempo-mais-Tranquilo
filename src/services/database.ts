import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
  limit,
  onSnapshot
} from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Family } from '../types';

const getCurrentUserId = async (): Promise<string> => {
  const stored = await AsyncStorage.getItem('@tempo:user');
  if (!stored) throw new Error('Usuário não autenticado');
  const user: User = JSON.parse(stored);
  return user.id;
};

export const database = {
  // ==================== USERS ====================
  async addUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const userDoc = await getDoc(docRef);
    return { id: docRef.id, ...userDoc.data() } as User;
  },

  async updateUser(userId: string, userData: Partial<User>) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
    const updatedDoc = await getDoc(userRef);
    return { id: userId, ...updatedDoc.data() } as User;
  },

  async getUsers(): Promise<User[]> {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  },

  async getUserById(id: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', id));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  },

  async removeUser(id: string) {
    await deleteDoc(doc(db, 'users', id));
  },

  async addNecessidade(necessidadeData: any) {
    return await addDoc(collection(db, 'necessidades'), necessidadeData);
  },

  onUsersChange(callback: (users: User[]) => void) {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      callback(users);
    });
  },

  async getUpdates(): Promise<any[]> {
    const q = query(collection(db, 'updates'), orderBy('createdAt', 'desc'), limit(2));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ==================== FAMILIAS ====================
  async addFamilia(familiaData: Omit<Family, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) {
    const userId = await getCurrentUserId();
    const docRef = await addDoc(collection(db, 'familias'), {
      ...familiaData,
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const familiaDoc = await getDoc(docRef);
    return { id: docRef.id, ...familiaDoc.data() } as Family;
  },

  async updateFamilia(familiaId: string, familiaData: Partial<Family>) {
    const userId = await getCurrentUserId();
    const familiaRef = doc(db, 'familias', familiaId);
    const familiaDoc = await getDoc(familiaRef);
    if (!familiaDoc.exists()) throw new Error('Família não encontrada');
    const familiaExistente = familiaDoc.data() as Family;
    if (familiaExistente.createdBy !== userId) {
      throw new Error('Sem permissão para atualizar esta família');
    }
    await updateDoc(familiaRef, {
      ...familiaData,
      updatedAt: serverTimestamp(),
    });
    const updatedDoc = await getDoc(familiaRef);
    return { id: familiaId, ...updatedDoc.data() } as Family;
  },

  async getFamilias(): Promise<Family[]> {
    try {
      const userId = await getCurrentUserId();
      console.log('Buscando famílias para usuário:', userId);
      
      // Query simples apenas com where, sem orderBy
      const q = query(
        collection(db, 'familias'),
        where('createdBy', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      console.log('Documentos encontrados:', querySnapshot.size);
      
      const familias = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Family[];

      // Ordenar no cliente após buscar os dados
      const familiasOrdenadas = familias.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });

      console.log('Famílias encontradas:', familiasOrdenadas.length);
      return familiasOrdenadas;
      
    } catch (error) {
      console.error('Erro detalhado ao buscar famílias:', error);
      throw error;
    }
  },

  async getAllFamilias(): Promise<Family[]> {
    try {
      console.log('Buscando TODAS as famílias...');
      
      const querySnapshot = await getDocs(collection(db, 'familias'));
      console.log('Total de documentos na coleção:', querySnapshot.size);
      
      const familias = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Família encontrada:', data.nome, 'ID:', doc.id);
        return {
          id: doc.id,
          ...data,
        };
      }) as Family[];

      // Ordenar no cliente
      const familiasOrdenadas = familias.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });

      console.log('Total de famílias retornadas:', familiasOrdenadas.length);
      return familiasOrdenadas;
      
    } catch (error) {
      console.error('Erro ao buscar todas as famílias:', error);
      throw error;
    }
  },

  async getFamiliaById(id: string): Promise<Family | null> {
    const userId = await getCurrentUserId();
    const familiaDoc = await getDoc(doc(db, 'familias', id));
    if (familiaDoc.exists()) {
      const familia = familiaDoc.data() as Family;
      if (familia.createdBy === userId) {
        return { ...familia, id: familiaDoc.id };
      }
    }
    return null;
  },

  async removeFamilia(id: string) {
    const userId = await getCurrentUserId();
    const familiaRef = doc(db, 'familias', id);
    const familiaDoc = await getDoc(familiaRef);
    if (!familiaDoc.exists()) throw new Error('Família não encontrada');
    const familia = familiaDoc.data() as Family;
    if (familia.createdBy !== userId) {
      throw new Error('Sem permissão para remover esta família');
    }
    await deleteDoc(familiaRef);
  },

  onFamiliasChange(callback: (familias: Family[]) => void) {
    getCurrentUserId().then(userId => {
      const q = query(
        collection(db, 'familias'),
        where('createdBy', '==', userId),
        orderBy('createdAt', 'desc')
      );
      return onSnapshot(q, (querySnapshot) => {
        const familias = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Family[];
        callback(familias);
      });
    }).catch(() => callback([]));
  },

  async migrateFromAsyncStorage(asyncStorageData: any) {
    const userId = await getCurrentUserId();
    const batch = writeBatch(db);

    if (asyncStorageData.users && Array.isArray(asyncStorageData.users)) {
      asyncStorageData.users.forEach((user: any) => {
        const userRef = doc(collection(db, 'users'));
        batch.set(userRef, {
          ...user,
          migratedFrom: 'AsyncStorage',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });
    }

    if (asyncStorageData.familias && Array.isArray(asyncStorageData.familias)) {
      asyncStorageData.familias.forEach((familia: any) => {
        const familiaRef = doc(collection(db, 'familias'));
        batch.set(familiaRef, {
          ...familia,
          createdBy: userId,
          migratedFrom: 'AsyncStorage',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });
    }

    await batch.commit();
    console.log('Migração concluída com sucesso!');
  },
};
