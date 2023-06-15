import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Filtro() {
  const navigation = useNavigation();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Função para buscar o token armazenado no AsyncStorage
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log('Erro ao buscar o token:', error);
      }
    };

    // Chame a função para buscar o token ao iniciar o componente
    getToken();
  }, []);

  const handleSelectPiece = () => {
    if (!marca || !modelo || !ano) {
      Alert.alert('Erro', 'Preencha todos os campos antes de buscar.');
      return;
    }

    if (!token) {
      Alert.alert('Erro', 'Você não está autenticado. Faça o login primeiro');
      return;
    }

    navigation.navigate('ResultadoFiltro', { marca, modelo, ano, token });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a marca:</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={(text) => setMarca(text)}
      />

      <Text style={styles.label}>Selecione o modelo:</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={(text) => setModelo(text)}
      />

      <Text style={styles.label}>Selecione o ano:</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={(text) => setAno(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSelectPiece}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    backgroundColor: 'blue',
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
