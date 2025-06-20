import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: any;
  updatedAt?: any;
  [key: string]: any;
}

type Membros = {
  nome: string;
  idade: string;
  parentesco: string;
};

export interface Familia {
  id: string;
  nome: string;
  membros?: Membros[];
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
  [key: string]: any;
}

export const database = {
  // ==================== USERS ====================
  
  async addUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const docRef = await firestore()
        .collection('users')
        .add({
          ...userData,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      const userDoc = await docRef.get();
      return { id: docRef.id, ...userDoc.data() } as User;
    } catch (error: any) {
      console.error('Erro ao adicionar usuário:', error);
      throw new Error('Erro ao adicionar usuário');
    }
  },

  async updateUser(userId: string, userData: Partial<User>) {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          ...userData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      const updatedDoc = await firestore()
        .collection('users')
        .doc(userId)
        .get();

      return { id: userId, ...updatedDoc.data() } as User;
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar usuário');
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .orderBy('createdAt', 'desc')
        .get();

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Erro ao buscar usuários');
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(id)
        .get();

      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() } as User;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Erro ao buscar usuário');
    }
  },

  async removeUser(id: string) {
    try {
      await firestore()
        .collection('users')
        .doc(id)
        .delete();
    } catch (error: any) {
      console.error('Erro ao remover usuário:', error);
      throw new Error('Erro ao remover usuário');
    }
  },

  async addNecessidade(necessidadeData: any) {
    return await firestore().collection('necessidades').add(necessidadeData);
  },

  // Escutar mudanças em tempo real nos usuários
  onUsersChange(callback: (users: User[]) => void) {
    return firestore()
      .collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as User[];
          callback(users);
        },
        (error) => {
          console.error('Erro ao escutar mudanças nos usuários:', error);
        }
      );
  },

  async getUpdates(): Promise<any[]> {
    const querySnapshot = await firestore()
      .collection('updates')
      .orderBy('createdAt', 'desc')
      .limit(2)
      .get();
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ==================== FAMILIAS ====================

  async addFamilia(familiaData: Omit<Familia, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      const docRef = await firestore()
        .collection('familias')
        .add({
          ...familiaData,
          createdBy: currentUser.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      const familiaDoc = await docRef.get();
      return { id: docRef.id, ...familiaDoc.data() } as Familia;
    } catch (error: any) {
      console.error('Erro ao adicionar família:', error);
      throw new Error('Erro ao adicionar família');
    }
  },

  async updateFamilia(familiaId: string, familiaData: Partial<Familia>) {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      // Verificar se o usuário tem permissão para atualizar esta família
      const familiaDoc = await firestore()
        .collection('familias')
        .doc(familiaId)
        .get();

      if (!familiaDoc.exists()) {
        throw new Error('Família não encontrada');
      }

      const familiaExistente = familiaDoc.data() as Familia;
      if (familiaExistente.createdBy !== currentUser.uid) {
        throw new Error('Sem permissão para atualizar esta família');
      }

      await firestore()
        .collection('familias')
        .doc(familiaId)
        .update({
          ...familiaData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      const updatedDoc = await firestore()
        .collection('familias')
        .doc(familiaId)
        .get();

      return { id: familiaId, ...updatedDoc.data() } as Familia;
    } catch (error: any) {
      console.error('Erro ao atualizar família:', error);
      throw new Error('Erro ao atualizar família');
    }
  },

  async getFamilias(): Promise<Familia[]> {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      const querySnapshot = await firestore()
        .collection('familias')
        .where('createdBy', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .get();

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Familia[];
    } catch (error: any) {
      console.error('Erro ao buscar famílias:', error);
      throw new Error('Erro ao buscar famílias');
    }
  },

  async getFamiliaById(id: string): Promise<Familia | null> {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      const familiaDoc = await firestore()
        .collection('familias')
        .doc(id)
        .get();

      if (familiaDoc.exists()) {
        const familia = familiaDoc.data() as Familia;
        // Verificar se o usuário tem acesso a esta família
        if (familia.createdBy === currentUser.uid) {
          return { ...familia, id: familiaDoc.id };
        }
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar família:', error);
      throw new Error('Erro ao buscar família');
    }
  },

  async removeFamilia(id: string) {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      // Verificar se o usuário tem permissão para remover esta família
      const familiaDoc = await firestore()
        .collection('familias')
        .doc(id)
        .get();

      if (!familiaDoc.exists) {
        throw new Error('Família não encontrada');
      }

      const familia = familiaDoc.data() as Familia;
      if (familia.createdBy !== currentUser.uid) {
        throw new Error('Sem permissão para remover esta família');
      }

      await firestore()
        .collection('familias')
        .doc(id)
        .delete();
    } catch (error: any) {
      console.error('Erro ao remover família:', error);
      throw new Error('Erro ao remover família');
    }
  },

  // Escutar mudanças em tempo real nas famílias do usuário atual
  onFamiliasChange(callback: (familias: Familia[]) => void) {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      callback([]);
      return () => {};
    }

    return firestore()
      .collection('familias')
      .where('createdBy', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const familias = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Familia[];
          callback(familias);
        },
        (error) => {
          console.error('Erro ao escutar mudanças nas famílias:', error);
        }
      );
  },

  // ==================== UTILITÁRIOS ====================

  // Função para fazer backup dos dados do AsyncStorage para Firestore
  async migrateFromAsyncStorage(asyncStorageData: any) {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      const batch = firestore().batch();

      // Migrar usuários (se houver)
      if (asyncStorageData.users && Array.isArray(asyncStorageData.users)) {
        asyncStorageData.users.forEach((user: any) => {
          const userRef = firestore().collection('users').doc();
          batch.set(userRef, {
            ...user,
            migratedFrom: 'AsyncStorage',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });
        });
      }

      // Migrar famílias (se houver)
      if (asyncStorageData.familias && Array.isArray(asyncStorageData.familias)) {
        asyncStorageData.familias.forEach((familia: any) => {
          const familiaRef = firestore().collection('familias').doc();
          batch.set(familiaRef, {
            ...familia,
            createdBy: currentUser.uid,
            migratedFrom: 'AsyncStorage',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });
        });
      }

      await batch.commit();
      console.log('Migração concluída com sucesso!');
    } catch (error: any) {
      console.error('Erro na migração:', error);
      throw new Error('Erro ao migrar dados');
    }
  },
};