import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home';
import History from './screens/History';

const Stack = createStackNavigator();

const Routes = () => {
  const [despesas, setDespesas] = useState([]);

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
