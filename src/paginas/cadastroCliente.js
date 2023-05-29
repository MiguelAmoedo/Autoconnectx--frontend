import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

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
    <View>
      <Text>Cadastro de Cliente</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />
      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={(text) => setEndereco(text)}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
      <Button
        title="Já tem uma conta? Faça o login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Cadastro;
