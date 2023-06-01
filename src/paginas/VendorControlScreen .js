import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VendorControlScreen = () => {
  const navigation = useNavigation();

  const handleAdicionarPeca = () => {
    navigation.navigate('AdicionarPeca');
  };

  const handleLerPecasVendedor = () => {
    navigation.navigate('LerPecasVendedor');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAdicionarPeca}>
        <Text style={styles.buttonText}>Adicionar Peças</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLerPecasVendedor}>
        <Text style={styles.buttonText}>Gerenciar Peças</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5cc6ba',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#5cc6ba',
    fontSize: 16,
  },
});

export default VendorControlScreen;
