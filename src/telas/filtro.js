import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Filtro() {
  const navigation = useNavigation();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  const handleSelectPiece = () => {
    if (!marca || !modelo || !ano) {
      alert('Preencha todos os campos antes de buscar.');
      return;
    }

    navigation.navigate('ResultadoFiltro', { marca, modelo, ano });
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
