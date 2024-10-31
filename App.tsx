import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { DatabaseProvider } from './context/DatabaseContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Consulta de Preços' }}
          />
          <Stack.Screen 
            name="Product" 
            component={ProductScreen} 
            options={{ title: 'Detalhes do Produto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
}