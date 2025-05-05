import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import PartListScreen from './screens/PartListScreen';
import ArabamScreen from './screens/ArabamScreen'; // ArabamScreen'i de ekledik

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Giriş Yap' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Kayıt Ol' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: 'Yedek Parça Asistanı' }}
        />
        <Stack.Screen
          name="FiyatListesi"
          component={PartListScreen}
          options={{ title: 'Yedek Parça Fiyatları' }}
        />
        <Stack.Screen
          name="Arabam"
          component={ArabamScreen}
          options={{ title: 'Arabam Ne Kadar?' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
