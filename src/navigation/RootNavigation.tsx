import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import das telas
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import PerfilScreen from '../screens/PerfilScreen';
import EditPerfilScreen from '../screens/EditPerfilScreen';
import FamiliaListScreen from '../screens/FamiliaListScreen';
import FamiliaPerfilScreen from '../screens/FamiliaPerfilScreen';
import CadastroFamiliaScreen from '../screens/CadastroFamiliaScreen';
import EditFamiliaPerfilScreen from '../screens/EditFamiliaPerfilScreen';
import NecessidadeScreen from '../screens/NecessidadeScreen';
import RecuperarSenhaScreen from '../screens/RecuperarSenhaScreen';

// Importar os tipos do arquivo index.ts
import type { RootStackParamList, Family } from '../types';
import HomeScreen from 'src/screens/HomeScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Navegação das tabs (menu inferior)
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FamiliaList') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'ellipse'; // fallback to a valid icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F87060',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerStyle: {
          backgroundColor: '#F87060',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="FamiliaList" 
        component={FamiliaListScreen} 
        options={{ title: 'Famílias Cadastradas' }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ title: 'Meu Perfil' }}
      />

    </Tab.Navigator>
  );
};

// Navegação principal (stack)
export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F87060',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Telas de autenticação */}
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="Cadastro" 
        component={CadastroScreen} 
        options={{ title: 'Criar Conta' }} 
      />
      
      {/* Telas principais (após login) */}
      <Stack.Screen 
        name="Main" 
        component={HomeTabs} 
        options={{ headerShown: false }} 
      />
      
      {/* Telas de perfil */}
      <Stack.Screen 
        name="EditPerfil" 
        component={EditPerfilScreen} 
        options={{ title: 'Editar Perfil' }} 
      />
      
      {/* Telas de famílias */}
      <Stack.Screen 
        name="CadastroFamilia" 
        component={CadastroFamiliaScreen} 
        options={{ title: 'Cadastrar Família' }} 
      />

      <Stack.Screen 
        name="FamiliaPerfil" 
        component={FamiliaPerfilScreen} 
        options={({ route }) => ({ 
          title: route.params?.family?.nome || 'Perfil da Família'
        })} 
      />

      <Stack.Screen 
        name="EditFamiliaPerfil" 
        component={EditFamiliaPerfilScreen} 
        options={{ title: 'Editar Família' }} 
      />
      
      {/* Telas de necessidades */}
      <Stack.Screen 
        name="Necessidade" 
        component={NecessidadeScreen} 
        options={{ title: 'Registrar Necessidade' }} 
      />

      <Stack.Screen
      name="RecuperarSenha"
      component={RecuperarSenhaScreen}
      options={{ title: 'Recuperar Senha' }}
      />
    </Stack.Navigator>
  );
}