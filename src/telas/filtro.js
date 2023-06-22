import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Importar o componente Picker
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Filtro() {
  const navigation = useNavigation();
  const [marca, setMarca] = useState('Chevrolet');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [token, setToken] = useState('');
  const [marcaError, setMarcaError] = useState(false);
  const [modeloError, setModeloError] = useState(false);
  const [anoError, setAnoError] = useState(false);

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
    // Validação dos campos em tempo real
    if (!marca) {
      setMarcaError(true);
      return;
    }
    setMarcaError(false);

    if (!modelo) {
      setModeloError(true);
      return;
    }
    setModeloError(false);

    if (!ano) {
      setAnoError(true);
      return;
    }
    setAnoError(false);

    if (!token) {
      Alert.alert('Erro', 'Você não está autenticado. Faça o login primeiro');
      return;
    }

    navigation.navigate('ResultadoFiltro', { marca, modelo, ano, token });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a marca:</Text>
      <View style={[styles.input, marcaError && styles.inputError]}>
        <Picker
          style={styles.picker}
          selectedValue={marca}
          onValueChange={(value) => setMarca(value)}
        >
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Fiat" value="Fiat" />
          <Picker.Item label="Ford" value="Ford" />
          <Picker.Item label="Honda" value="Honda" />
          <Picker.Item label="Hyundai" value="Hyundai" />
          <Picker.Item label="Jeep" value="Jeep" />
          <Picker.Item label="Nissan" value="Nissan" />
          <Picker.Item label="Renault" value="Renault" />
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Volkswagen" value="Volkswagen" />
        </Picker>
      </View>

      <Text style={styles.label}>Selecione o modelo:</Text>
      <TextInput
        style={[styles.input, modeloError && styles.inputError]}
        value={modelo}
        onChangeText={(text) => setModelo(text)}
      />

      <Text style={styles.label}>Selecione o ano:</Text>
      <TextInput
        style={[styles.input, anoError && styles.inputError]}
        value={ano}
        onChangeText={(text) => setAno(text)}
        keyboardType="numeric" // Define o teclado para exibir apenas números
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
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  inputError: {
    borderColor: 'red',
  },
  picker: {
    height: 20,
    width: '110%',
    marginVertical: -9,
    marginHorizontal: -13,
  },
  Picker: {
    fontWeight: 'bold'
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
