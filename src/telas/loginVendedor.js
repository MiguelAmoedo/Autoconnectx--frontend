import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginVendedor = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/login/vendedor', {
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
        await AsyncStorage.setItem('authToken', data.token);
        Alert.alert('Sucesso', data.message);
        navigation.navigate('Filtro', F); // Navegar para a tela "AdicionarPeca"
      } else {
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o login do vendedor');
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

      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
      />

      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroVendedor')}>
        <Text style={styles.signupText}>Ainda não tem uma conta? Cadastre-se</Text>
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
  label: {
    marginBottom: 0,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#A0A0A0',
    marginTop: 10,
  },
});

export default LoginVendedor;
