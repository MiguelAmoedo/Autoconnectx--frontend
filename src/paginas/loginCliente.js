import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

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
        // Redirecionar para a próxima tela após o login
        // navigation.navigate('PróximaTela');
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
    <View>
      <Text>Login</Text>
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
      <Button title="Entrar" onPress={handleLogin} />
      <Button
        title="Ainda não tem uma conta? Cadastre-se"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
};

export default Login;
