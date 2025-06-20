import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../services/database';
import { Alert } from 'react-native';

export const migrationHelper = {
  /**
   * Migra dados do AsyncStorage para o Firebase Firestore
   */
  async migrateToFirebase(): Promise<boolean> {
    try {
      // Verificar se já foi migrado
      const migrated = await AsyncStorage.getItem('MIGRATION_COMPLETED');
      if (migrated) {
        console.log('Migração já foi realizada anteriormente');
        return true;
      }

      Alert.alert(
        'Migração de Dados',
        'Seus dados locais serão migrados para a nuvem. Este processo pode levar alguns momentos.',
        [{ text: 'OK' }]
      );

      // Buscar dados do AsyncStorage
      const asyncData = await this.getAsyncStorageData();
      
      if (Object.keys(asyncData).length === 0) {
        console.log('Nenhum dado encontrado para migrar');
        await AsyncStorage.setItem('MIGRATION_COMPLETED', 'true');
        return true;
      }

      // Migrar para Firebase
      await database.migrateFromAsyncStorage(asyncData);

      // Marcar como migrado
      await AsyncStorage.setItem('MIGRATION_COMPLETED', 'true');
      
      Alert.alert(
        'Sucesso',
        'Seus dados foram migrados com sucesso para a nuvem!',
        [{ text: 'OK' }]
      );

      return true;
    } catch (error) {
      console.error('Erro na migração:', error);
      Alert.alert(
        'Erro na Migração',
        'Houve um problema ao migrar seus dados. Tente novamente mais tarde.',
        [{ text: 'OK' }]
      );
      return false;
    }
  },

  /**
   * Busca todos os dados relevantes do AsyncStorage
   */
  async getAsyncStorageData(): Promise<any> {
    try {
      const keys = [
        'APP_USERS',
        'APP_FAMILIAS',
        'APP_USER', // usuário atual (se houver)
      ];

      const data: any = {};

      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          try {
            data[key] = JSON.parse(value);
          } catch (parseError) {
            console.warn(`Erro ao parsear ${key}:`, parseError);
          }
        }
      }

      return {
        users: data.APP_USERS || [],
        familias: data.APP_FAMILIAS || [],
        currentUser: data.APP_USER || null,
      };
    } catch (error) {
      console.error('Erro ao buscar dados do AsyncStorage:', error);
      return {};
    }
  },

  /**
   * Limpa dados do AsyncStorage após migração bem-sucedida
   */
  async cleanupAsyncStorage(): Promise<void> {
    try {
      const keysToRemove = [
        'APP_USERS',
        'APP_FAMILIAS',
        'APP_USER',
      ];

      await AsyncStorage.multiRemove(keysToRemove);
      console.log('Dados do AsyncStorage limpos após migração');
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage:', error);
    }
  },

  /**
   * Verifica se a migração já foi concluída
   */
  async isMigrationCompleted(): Promise<boolean> {
    try {
      const migrated = await AsyncStorage.getItem('MIGRATION_COMPLETED');
      return migrated === 'true';
    } catch (error) {
      console.error('Erro ao verificar status da migração:', error);
      return false;
    }
  },

  /**
   * Reseta status de migração (útil para testes)
   */
  async resetMigrationStatus(): Promise<void> {
    try {
      await AsyncStorage.removeItem('MIGRATION_COMPLETED');
      console.log('Status de migração resetado');
    } catch (error) {
      console.error('Erro ao resetar status de migração:', error);
    }
  },

  /**
   * Exporta dados atuais do Firebase para backup
   */
  async exportFirebaseData(): Promise<any> {
    try {
      const [users, familias] = await Promise.all([
        database.getUsers(),
        database.getFamilias(),
      ]);

      const exportData = {
        users,
        familias,
        exportDate: new Date().toISOString(),
      };

      console.log('Dados exportados:', exportData);
      return exportData;
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      throw error;
    }
  },

  /**
   * Função para testar a conectividade com Firebase
   */
  async testFirebaseConnection(): Promise<boolean> {
    try {
      // Tentar uma operação simples no Firebase
      await database.getUsers();
      console.log('Conexão com Firebase OK');
      return true;
    } catch (error) {
      console.error('Erro de conexão com Firebase:', error);
      return false;
    }
  },
};