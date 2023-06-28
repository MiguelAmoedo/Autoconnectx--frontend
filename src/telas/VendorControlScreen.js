import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VendorControlScreen = () => {
  const navigation = useNavigation();

  const handleAdicionarPeca = () => {
    navigation.navigate('AdicionarPeca');
  };

  const handleLerPecasVendedor = () => {
    navigation.navigate('GerenciarPeca');
  };

  const handlePecasVendidas = () => {
    navigation.navigate('PecasVendidas');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('LoginVendedor');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>VENDEDORES</Text>

      <TouchableOpacity style={styles.button} onPress={handleAdicionarPeca}>
        <Text style={styles.buttonText}>Adicionar Peças</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLerPecasVendedor}>
        <Text style={styles.buttonText}>Gerenciar Peças</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePecasVendidas}>
        <Text style={styles.buttonText}>Peças Vendidas</Text>
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
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 0,
  },
  logo: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    top: -80
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    top: -80
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default VendorControlScreen;
