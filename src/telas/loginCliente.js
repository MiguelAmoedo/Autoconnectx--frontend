import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/logo';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      // Realizar a chamada à API do backend para fazer o login do cliente
      const response = await fetch('http://10.0.2.2:5000/login/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        Alert.alert('Sucesso', data.message);
        // Salvar o token de autenticação no armazenamento local
        await AsyncStorage.setItem('authToken', data.token);
        // Redirecionar para a próxima tela após o login
        navigation.navigate('AddToCartScreen');
      } else {
        // Exibir mensagem de erro caso o login tenha falhado
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      // Lidar com erros de conexão ou outros erros
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o login do cliente');
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
      <Text style={styles.title}>AUTOCONNECTX</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.createAccountText}>
          Toque para criar uma conta
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createSellerAccountButton}
        onPress={() => navigation.navigate('LoginVendedor')}
      >
        <Text style={styles.createSellerAccountText}>
          Você é um vendedor? Clique aqui
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: -200
  },
  logo: {
    width: 246,
    height: 246,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 31,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 31,
    backgroundColor: '#5cc6ba',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountText: {
    color: '#A0A0A0',
  },
  createSellerAccountButton: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
  },
  createSellerAccountText: {
    color: '#A0A0A0',
  },
});

export default Login;