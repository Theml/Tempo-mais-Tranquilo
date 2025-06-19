import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'APP_USER';

export const auth = {
  async signInWithEmailAndPassword(email: string, password: string) {
    // Simulação: aceita qualquer email/senha
    const user = { email };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user };
  },
  async createUserWithEmailAndPassword(email: string, password: string) {
    // Simulação: cria usuário local
    const user = { email };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user };
  },
  async signOut() {
    await AsyncStorage.removeItem(USER_KEY);
  },
  async getCurrentUser() {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  onAuthStateChanged(callback: (user: any) => void) {
    // Simulação: chama callback imediatamente e retorna unsubscribe mock
    auth.getCurrentUser().then(callback);
    return () => {};
  },
};
