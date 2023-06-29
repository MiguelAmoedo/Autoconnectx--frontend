import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button , ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useParams } from 'react-router-native';
import { useNavigation } from '@react-navigation/native';

const AdicionarPeca = () => {
  const { id } = useParams();


  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [tipoDePeca, setTipoDePeca] = useState('Motor');
  const [marca, setMarca] = useState('Chevrolet');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [status, setStatus] = useState('Disponivel');
  const [partesVeiculo, setPartesVeiculo] = useState('Motor e Componentes');

  const handleAddPeca = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');

      if (!authToken) {
        Alert.alert('Erro', 'Você não está autenticado. Faça o login primeiro');
        return;
      }

      let url = 'https://backend1-swart.vercel.app/vendedores/pecas';
      let method = 'POST';

      if (id) {
        url += `/${id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify({
          nome,
          imagem, // Add this line to include the "imagem" field
          tipoDePeca,
          marca,
          modelo,
          ano,
          descricao,
          preco,
          qtdEstoque: 1,
          status,
          partesVeiculo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Peça adicionada/atualizada com sucesso');
        // Clear input fields after successful addition/update
        setNome('');
        setImagem('');
        setTipoDePeca('Motor');
        setMarca('');
        setModelo('');
        setAno('');
        setDescricao('');
        setPreco('');
        setStatus('Disponivel');
        setPartesVeiculo('Motor e Componentes');
      } else {
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar/atualizar a peça');
    }
  };

  useEffect(() => {
    // If updating an existing piece, fetch its details and populate the form
    const fetchPecaDetails = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');

        if (!authToken) {
          Alert.alert('Erro', 'Você não está autenticado. Faça o login primeiro');
          return;
        }

        const response = await fetch(`https://backend1-swart.vercel.app/vendedores/pecas/${id}`, {
          headers: {
            Authorization: authToken,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const { nome, tipoDePeca, imagem, marca, modelo, ano, descricao, preco, status, partesVeiculo } = data;
          setNome(nome);
          setTipoDePeca(tipoDePeca);
          setImagem(imagem);
          setMarca(marca);
          setModelo(modelo);
          setAno(ano);
          setDescricao(descricao);
          setPreco(preco);
          setStatus(status);
          setPartesVeiculo(partesVeiculo);
        } else {
          Alert.alert('Erro', data.error);
        }
      } catch (error) {
        console.log('Error:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os detalhes da peça');
      }
    };

    if (id) {
      fetchPecaDetails();
    }
  }, [id]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Nome:</Text>
        <TextInput value={nome} onChangeText={setNome} style={styles.input} />

        <Text style={styles.text}>Tipo de Peça:</Text>
        <View style={styles.pickerContainer}>
        <Picker selectedValue={tipoDePeca} onValueChange={setTipoDePeca} style={styles.picker}>
          <Picker.Item label="Motor" value="Motor" />
          <Picker.Item label="Cabeçote" value="Cabeçote" />
          <Picker.Item label="Bloco do motor" value="Bloco do motor" />
          <Picker.Item label="Rodas" value="Rodas" />
          <Picker.Item label="Bielas" value="Bielas" />
          <Picker.Item label="Pistões" value="Pistões" />
          <Picker.Item label="Anéis de pistão" value="Anéis de pistão" />
          <Picker.Item label="Virabrequim" value="Virabrequim" />
          <Picker.Item label="Comando de válvulas" value="Comando de válvulas" />
          <Picker.Item label="Válvulas" value="Válvulas" />
          <Picker.Item label="Tuchos" value="Tuchos" />
          <Picker.Item label="Correia dentada" value="Correia dentada" />
          <Picker.Item label="Corrente de distribuição" value="Corrente de distribuição" />
          <Picker.Item label="Bomba de óleo" value="Bomba de óleo" />
          <Picker.Item label="Bomba de água" value="Bomba de água" />
          <Picker.Item label="Bomba de combustível" value="Bomba de combustível" />
          <Picker.Item label="Radiador de óleo" value="Radiador de óleo" />
          <Picker.Item label="Filtro de ar" value="Filtro de ar" />
          <Picker.Item label="Filtro de óleo" value="Filtro de óleo" />
          <Picker.Item label="Filtro de combustível" value="Filtro de combustível" />
          <Picker.Item label="Velas de ignição" value="Velas de ignição" />
          <Picker.Item label="Cabos de ignição" value="Cabos de ignição" />
          <Picker.Item label="Sistema de injeção de combustível" value="Sistema de injeção de combustível" />
          <Picker.Item label="Sistema de ignição" value="Sistema de ignição" />
          <Picker.Item label="Disco de embreagem" value="Disco de embreagem" />
          <Picker.Item label="Platô de embreagem" value="Platô de embreagem" />
          <Picker.Item label="Rolamento de embreagem" value="Rolamento de embreagem" />
          <Picker.Item label="Cilindro mestre de embreagem" value="Cilindro mestre de embreagem" />
          <Picker.Item label="Cilindro escravo de embreagem" value="Cilindro escravo de embreagem" />
          <Picker.Item label="Tanque de combustível" value="Tanque de combustível" />
          <Picker.Item label="Bomba de combustível" value="Bomba de combustível" />
          <Picker.Item label="Bóia de nível de combustível" value="Bóia de nível de combustível" />
          <Picker.Item label="Catalisador" value="Catalisador" />
          <Picker.Item label="Tubo de escape" value="Tubo de escape" />
          <Picker.Item label="Silenciador" value="Silenciador" />
          <Picker.Item label="Molas de suspensão" value="Molas de suspensão" />
          <Picker.Item label="Molas helicoidais" value="Molas helicoidais" />
          <Picker.Item label="Molas a ar" value="Molas a ar" />
          <Picker.Item label="Discos de freio dianteiros" value="Discos de freio dianteiros" />
          <Picker.Item label="Discos de freio traseiros" value="Discos de freio traseiros" />
          <Picker.Item label="Pastilhas de freio" value="Pastilhas de freio" />
          <Picker.Item label="Pinças de freio" value="Pinças de freio" />
          <Picker.Item label="Cilindro mestre de freio" value="Cilindro mestre de freio" />
          <Picker.Item label="Cilindros de roda" value="Cilindros de roda" />
          <Picker.Item label="Radiador" value="Radiador" />
          <Picker.Item label="Ventoinha do radiador" value="Ventoinha do radiador" />
          <Picker.Item label="Mangueiras de radiador" value="Mangueiras de radiador" />
          <Picker.Item label="Válvula termostática" value="Válvula termostática" />
          <Picker.Item label="Portas" value="Portas" />
          <Picker.Item label="Capô" value="Capô" />
          <Picker.Item label="Para-lamas" value="Para-lamas" />
          <Picker.Item label="Para-choques" value="Para-choques" />
          <Picker.Item label="Teto" value="Teto" />
          <Picker.Item label="Vidros" value="Vidros" />
          <Picker.Item label="Retrovisores" value="Retrovisores" />
          <Picker.Item label="Lanternas" value="Lanternas" />
          <Picker.Item label="Faróis" value="Faróis" />
          <Picker.Item label="Grades" value="Grades" />
          <Picker.Item label="Painel de instrumentos" value="Painel de instrumentos" />
          <Picker.Item label="Bancos" value="Bancos" />
          <Picker.Item label="Tapetes" value="Tapetes" />
          <Picker.Item label="Volante" value="Volante" />
          <Picker.Item label="Cintos de segurança" value="Cintos de segurança" />
          <Picker.Item label="Airbags" value="Airbags" />
        </Picker>
        </View>

        <Text style={styles.text}>Marca:</Text>
        <View style={styles.pickerContainer}>
        <Picker selectedValue={marca} onValueChange={setMarca} style={styles.picker}>
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Volkswagen" value="Volkswagen" />
          <Picker.Item label="Fiat" value="Fiat" />
          <Picker.Item label="Ford" value="Ford" />
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Honda" value="Honda" />
          <Picker.Item label="Renault" value="Renault" />
          <Picker.Item label="Hyundai" value="Hyundai" />
          <Picker.Item label="Nissan" value="Nissan" />
          <Picker.Item label="Jeep" value="Jeep" />
        </Picker>
        </View>

        <Text style={styles.text}>Link da Imagem:</Text>
        <TextInput value={imagem} onChangeText={setImagem} style={styles.input} />

        <Text style={styles.text}>Modelo:</Text>
        <TextInput value={modelo} onChangeText={setModelo} style={styles.input} />

        <Text style={styles.text}>Ano:</Text>
        <TextInput value={ano} onChangeText={setAno} style={styles.input} />

        <Text style={styles.text}>Descrição:</Text>
        <TextInput value={descricao} onChangeText={setDescricao} style={styles.largeInput} />

        <Text style={styles.text}>Preço:</Text>
        <TextInput value={preco} onChangeText={setPreco} style={styles.input} />

        <Text style={styles.text}>Status:</Text>
        <View style={styles.pickerContainer}>
        <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
          <Picker.Item label="Disponivel" value="Disponivel" />
        </Picker>
        </View>

      <Text style={styles.text}>Partes do Veículo:</Text>
      <View style={styles.pickerContainer}>
      <Picker selectedValue={partesVeiculo} onValueChange={setPartesVeiculo} style={styles.picker}>
        <Picker.Item label="Motor e Componentes" value="Motor e Componentes" />
        <Picker.Item label="Embreagem" value="Embreagem" />
        <Picker.Item label="Tanque de combustível" value="Tanque de combustível" />
        <Picker.Item label="Catalisador" value="Catalisador" />
        <Picker.Item label="Rodas" value="Rodas" />
        <Picker.Item label="Disco de freio" value="Disco de freio" />
        <Picker.Item label="Radiador" value="Radiador" />
        <Picker.Item label="Carroceria" value="Carroceria" />
      </Picker>
      </View>

        <TouchableOpacity onPress={handleAddPeca} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Peça</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'ghostwhite',
    marginBottom: 0,
    paddingBottom: 115,
  },
  text: {
    left: 3,
  },
  input: {
    width: 370,
    height: 25,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    paddingBottom: 0,
    left: 10,
    // paddingLeft: 0,
  },
  pickerContainer: {
    flex: 1,
    width: 370,
    height: 25,
    left: 10,
    borderRadius: 5,
    backgroundColor: 'ghostwhite',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  picker: {
    left: -5,
    width: 380,
    top: -16,
    color: 'black',
  },
  largeInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginBottom: 0,
    width: 370,
    height: 100,
    left: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginBottom: 0,
    width: 350,
    height: 45,
    left: 20,
    top: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
};

export default AdicionarPeca;
