import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Logo from '../components/logo';

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
      const response = await fetch('http://10.0.2.2:5000/login/vendedor/cadastro', {
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
     
      <Text style={styles.title}>Cadastro de Vendedor</Text>
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
      <Button
        title="Cadastrar"
        onPress={handleCadastro}
        color="#5cc6ba"
      />
      <View style={styles.loginButtonContainer}>
        <Button
          title="Já tem conta? Faça login"
          onPress={() => navigation.navigate('LoginVendedor')}
          color="#5cc6ba"
        />
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
    borderColor: 'gray',
    borderRadius: 31,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  loginButtonContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default CadastroVendedor;
