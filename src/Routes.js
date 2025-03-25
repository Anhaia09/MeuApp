import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home';
import History from './screens/History';
import { storage } from './services/storage';

const Stack = createStackNavigator();

const Routes = () => {
  const [despesas, setDespesas] = useState(() => {
    try {
      return JSON.parse(storage.getString('expenses')) || [];
    } catch {
      return [];
    }
  });
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} despesas={despesas} setDespesas={setDespesas} />}
        </Stack.Screen>
        <Stack.Screen name="History">
          {(props) => <History {...props} despesas={despesas} setDespesas={setDespesas} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
