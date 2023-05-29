import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const CadastroVendedor = () => {
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
    <View>
      <Text>Cadastro de Vendedor</Text>
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
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={(text) => setCnpj(text)}
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
    </View>
  );
};

export default CadastroVendedor;
