import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import logo from '../assets/vendedor.png';

const CadastroVendedor = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastro = async () => {
    try {
      // Realizar a chamada à API do backend para cadastrar o vendedor
      const response = await fetch('https://backend1-swart.vercel.app/login/vendedor/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          cnpj,
          endereco,
          telefone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cadastro bem-sucedido
        Alert.alert('Sucesso', data.message);
        // Redirecionar para a próxima tela após o cadastro
        // navigation.navigate('PróximaTela');
      } else {
        // Exibir mensagem de erro caso o cadastro tenha falhado
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      // Lidar com erros de conexão ou outros erros
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o vendedor');
    }
  };

  return (
    <View style={styles.container}>
      
      <Image source={logo} style={styles.vendedor}/>
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
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={(text) => setCnpj(text)}
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

      <View style={styles.loginButtonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('LoginVendedor')}>
        <Text style={styles.signupText}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'ghostwhite',
  },
  logo: {
    height: 150,
    width: 140,
    marginBottom: 20,
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
    borderColor: 'rgb(220,220,220)',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    top: -50,
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    top: -35,
    },
    
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
   },
  loginButtonContainer: {
    bottom: -100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  signupText: {
    color: '#A0A0A0',
    marginTop: 10,
    top: -100,
  },
  vendedor: {
    height: 150,
    width: 105,
    top: -40 ,
  },
});

export default CadastroVendedor;
