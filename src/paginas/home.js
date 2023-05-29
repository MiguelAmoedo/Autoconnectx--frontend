import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleLoginCliente = () => {
    navigation.navigate('Login');
  };

  const handleLoginVendedor = () => {
    navigation.navigate('LoginVendedor');
  };

  return (
    <View style={styles.page}>
 
      <Text style={styles.title}>AutoconnectX</Text>
      <View style={styles.formLogin}>
        <Text style={styles.description}>Bem-vindo à página inicial!</Text>
        <TouchableOpacity style={styles.btn} onPress={handleLoginCliente}>
          <Text style={styles.btnText}>Login Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLoginVendedor}>
          <Text style={styles.btnText}>Login Vendedor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
  },
  formLogin: {
    backgroundColor: '#F1F5F4',
    borderRadius: 7,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#5cc6ba',
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  btnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
};

export default Home;
