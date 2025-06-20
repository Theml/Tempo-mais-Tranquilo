import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  [key: string]: any;
}

export const authService = {
  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return { user: userCredential.user };
    } catch (error: any) {
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  },

  async createUserWithEmailAndPassword(email: string, password: string, additionalData?: any) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Salvar dados adicionais no Firestore
      if (additionalData) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            email: user.email,
            uid: user.uid,
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...additionalData,
          });
      }

      return { user };
    } catch (error: any) {
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  },

  async signOut() {
    try {
      await auth().signOut();
    } catch (error: any) {
      throw new Error('Erro ao fazer logout');
    }
  },

  getCurrentUser() {
    return auth().currentUser;
  },

  onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
  },

  // Função para traduzir códigos de erro do Firebase
  getAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/email-already-in-use':
        return 'Este email já está em uso';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/user-disabled':
        return 'Usuário desabilitado';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet';
      default:
        return 'Email ou senha inválidos';
    }
  },

  // Função para atualizar perfil do usuário
  async updateProfile(displayName?: string, photoURL?: string) {
    const user = auth().currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    try {
      await user.updateProfile({ displayName, photoURL });
      
      // Atualizar também no Firestore
      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          displayName,
          photoURL,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error: any) {
      throw new Error('Erro ao atualizar perfil');
    }
  },

  // Função para obter dados adicionais do usuário do Firestore
  async getUserData(uid: string) {
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(uid)
        .get();

      return userDoc.exists() ? userDoc.data() : null;
    } catch (error: any) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  },
};