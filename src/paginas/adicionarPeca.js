import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';


const AdicionarPeca = () => {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [qtdEstoque, setQtdEstoque] = useState('');
  const [partesVeiculo, setPartesVeiculo] = useState('Motor e Componentes');
  const [status, setStatus] = useState('Disponivel');

  const handleAddPeca = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');

      if (!authToken) {
        Alert.alert('Erro', 'Você não está autenticado. Faça o login primeiro');
        return;
      }

      const response = await fetch('http://10.0.2.2:5000/vendedores/pecas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify({
          nome,
          marca,
          modelo,
          ano,
          descricao,
          preco,
          qtdEstoque,
          partesVeiculo,
          status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Peça adicionada com sucesso');
        // Clear input fields after successful addition
        setNome('');
        setMarca('');
        setModelo('');
        setAno('');
        setDescricao('');
        setPreco('');
        setQtdEstoque('');
        setPartesVeiculo('Motor e Componentes');
        setStatus('Disponivel');
      } else {
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar a peça');
    }
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput value={nome} onChangeText={setNome} placeholder="Digite o nome da peça" />

      <Text>Marca:</Text>
      <TextInput value={marca} onChangeText={setMarca} placeholder="Digite a marca da peça" />

      <Text>Modelo:</Text>
      <TextInput value={modelo} onChangeText={setModelo} placeholder="Digite o modelo da peça" />

      <Text>Ano:</Text>
      <TextInput value={ano} onChangeText={setAno} placeholder="Digite o ano da peça" />

      <Text>Descrição:</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Digite a descrição da peça"
      />

      <Text>Preço:</Text>
      <TextInput value={preco} onChangeText={setPreco} placeholder="Digite o preço da peça" />

      <Text>Quantidade em Estoque:</Text>
      <TextInput
        value={qtdEstoque}
        onChangeText={setQtdEstoque}
        placeholder="Digite a quantidade em estoque"
      />

      <Text>Partes do Veículo:</Text>
      <Picker
  selectedValue={partesVeiculo}
  onValueChange={(itemValue) => setPartesVeiculo(itemValue)}
>
  <Picker.Item label="Motor e Componentes" value="Motor e Componentes" />
  <Picker.Item label="Embreagem" value="Embreagem" />
  <Picker.Item label="Tanque de combustível" value="Tanque de combustível" />
  <Picker.Item label="Catalisador" value="Catalisador" />
  <Picker.Item label="Molas" value="Molas" />
  <Picker.Item label="Disco de freio" value="Disco de freio" />
  <Picker.Item label="Radiador" value="Radiador" />
  <Picker.Item label="Carroceria" value="Carroceria" />
</Picker>

 
      <Text>Status:</Text>
      <Picker selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
        <Picker.Item label="Disponível" value="Disponivel" />
        <Picker.Item label="Vendida" value="Vendida" />
        <Picker.Item label="Manutenção" value="Manutenção" />
      </Picker>

      <Button title="Adicionar Peça" onPress={handleAddPeca} />
    </View>
  );
};

export default AdicionarPeca;
