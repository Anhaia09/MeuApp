import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Page</Text>
      <Button title="Ir para Perfil" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default Home;
