import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Logo from '../components/logo';
import logo from '../assets/cliente.png';

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    try {
      // Realizar a chamada à API do backend para cadastrar o cliente
      const response = await fetch('https://backend1-swart.vercel.app/login/cliente/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          endereco,
          telefone,
          cpf
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
      {/* <View style={styles.logoContainer}>
        
      </View> */}
      <Image source={logo} style={styles.cliente}/>
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
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
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
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={(text) => setConfirmarSenha(text)}
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
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      backgroundColor: 'ghostwhite',
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
      borderColor: 'rgb(220,220,220)',
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 10,
      top: -25,
      textAlign: 'center',
      },
      button: {
      backgroundColor: '#000000',
      padding: 10,
      alignItems: 'center',
      borderRadius: 10,
      },
      
      buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      },
      

      loginText: {
        fontSize: 13,
        color: '#999',
        marginBottom: 10,
        top: 16,  
      },
      cliente: {
        height: 120,
        width: 120,
        top: -40 ,
      }
      
      });

export default Cadastro;
