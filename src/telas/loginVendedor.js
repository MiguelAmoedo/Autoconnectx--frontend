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
      const response = await fetch('https://backend1-swart.vercel.app/login/vendedor', {
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
        navigation.navigate('VendorControlScreen'); // Navegar para a tela "AdicionarPeca"
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
    paddingBottom: -10,
    marginBottom: -150,
    backgroundColor: 'ghostwhite',
    
  },
  logoContainer: {
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: -200
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 20,
    top: 0,
  },
  title: {
    top: -100,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 0,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 3,
    paddingHorizontal: 10,
    top: -110
  },
  button: {
    width: '40%',
    height: 40,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -90,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#A0A0A0',
    marginTop: 10,
  },
});

export default LoginVendedor;
