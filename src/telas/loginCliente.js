import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/logo';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [clienteId, setClienteId] = useState('');

  const handleLogin = async () => {
    try {
      // Realizar a chamada à API do backend para fazer o login do cliente
      const response = await fetch('https://backend1-swart.vercel.app/login/cliente', {
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
        // Salvar o token de autenticação no AsyncStorage
        await AsyncStorage.setItem('authToken', data.token);
        // Armazenar o ID do cliente em uma variável
        const clienteId = data.clienteId;
        // Salvar o ID do cliente no AsyncStorage
        await AsyncStorage.setItem('logIdCliente', clienteId);
        // Atualizar o estado clienteId
        setClienteId(clienteId);
        // Redirecionar para a próxima tela após o login
        navigation.navigate('Filtro');
        // Exibir alerta ao navegar para a página "Filtro"
        Alert.alert(
          'Atenção',
          'Gostaríamos de ressaltar que o nosso papel é meramente informativo, fornecendo orientações sobre onde encontrar a peça que você precisa. No entanto, não podemos assumir responsabilidade por quaisquer problemas que possam surgir durante o processo de negociação com o vendedor. É essencial que você conduza qualquer transação com cautela, verificando cuidadosamente o estado da peça e tomando precauções para evitar possíveis golpes ou fraudes.'
        );
      } else {
        // Exibir mensagem de erro caso o login tenha falhado
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      // Lidar com erros de conexão ou outros erros
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o login do cliente');
    }
  };

  useEffect(() => {
    const loadClienteId = async () => {
      const storedClienteId = await AsyncStorage.getItem('logIdCliente');
      if (storedClienteId) {
        setClienteId(storedClienteId);
      }
    };
    loadClienteId();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      
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
    backgroundColor: 'ghostwhite',
    marginBottom: 0,
    paddingBottom: -200,
    paddingVertical: -100
  },
  logoContainer: {
    marginBottom: -16,
  },
  logo: {
    width: 350,
    height: 330,
    marginBottom: 7,
    top: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  createAccountText: {
    fontSize: 16,
    
  },
  createSellerAccountButton: {
    marginTop: 32,
    marginBottom: -10,
    marginVertical: -100,
   
   
  },
  createSellerAccountText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: -10,
    
   
  },
  clienteIdText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default Login;
