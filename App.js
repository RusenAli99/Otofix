import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import PartListScreen from './screens/PartListScreen'; // bu eklendi

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Giriş">
        <Stack.Screen name="Giriş" component={LoginScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="FiyatListesi" component={PartListScreen} options={{ title: 'Yedek Parça Fiyatları' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
