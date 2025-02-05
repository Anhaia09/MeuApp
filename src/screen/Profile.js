import React from 'react';
import { View, Text, Button } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Perfil</Text>
      <Button title="Voltar para Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Profile;
