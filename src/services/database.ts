import AsyncStorage from '@react-native-async-storage/async-storage';

export const database = {
  async setItem(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async getItem<T = any>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  },
  async getAllKeys() {
    return AsyncStorage.getAllKeys();
  },
};
