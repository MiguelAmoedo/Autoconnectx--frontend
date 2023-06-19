import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/logo';

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastro = async () => {
    try {
      // Realizar a chamada à API do backend para cadastrar o cliente
      const response = await fetch('http://10.0.2.2:5000/login/cliente/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          cpf,
          endereco,
          telefone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cadastro bem-sucedido
        Alert.alert('Sucesso', data.message);
        // Redirecionar para a tela de login
        navigation.navigate('Login');
      } else {
        // Exibir mensagem de erro caso o cadastro tenha falhado
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      // Lidar com erros de conexão ou outros erros
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o cliente');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        
      </View>
      <Text style={styles.title}>Cadastro de Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={(text) => setEndereco(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Já tem uma conta? Faça o login</Text>
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
      label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      },
      input: {
      height: 40,
      width: '80%',
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      paddingHorizontal: 10,
      },
      button: {
      backgroundColor: '#5cc6ba',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      },
      buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      },
      });

export default Cadastro;
