import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Compras = ({ route }) => {
  const { idPeca, token } = route.params;
  const [peca, setPeca] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://10.0.2.2:5000/pecas/${idPeca}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setPeca(data))
      .catch(error => console.error(error));
  }, [idPeca, token]);

  useEffect(() => {
    if (peca && peca.idVendedor) {
      fetch(`http://10.0.2.2:5000/vendedores/${peca.idVendedor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => setVendedor(data))
        .catch(error => console.error(error));
    }
  }, [peca, token]);

  const handleFinalizarCompra = () => {
    console.log('Compra finalizada');
  };

  const adicionarAoCarrinho = async () => {
    try {
      const clienteId = await retrieveLogIdCliente();

      const dados = {
        clienteId,
        pecaId: idPeca,
        quantidade: 1,
      };

      console.log('Dados:', dados);

      const response = await axios.post('http://10.0.2.2:5000/compras/carrinho', dados);

      console.log('Resposta:', response.data);

      if (response.status === 200) {
        Alert.alert('Sucesso', response.data.message);
      } else {
        Alert.alert('Erro', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o item ao carrinho.');
    }
  };

  const handleNavigateToCarrinho = () => {
    navigation.navigate('Carrinho');
  };

  const retrieveLogIdCliente = async () => {
    try {
      const logIdCliente = await AsyncStorage.getItem('logIdCliente');
      if (logIdCliente !== null) {
        // O valor foi recuperado com sucesso
        return logIdCliente;
      } else {
        // O valor não existe no AsyncStorage
        console.log('ID do cliente não encontrado');
        return null;
      }
    } catch (error) {
      // Ocorreu um erro ao tentar recuperar o valor do AsyncStorage
      console.error(error);
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pecaContainer}>
        <Text style={styles.nome}>{peca?.nome}</Text>
        <Text style={styles.preco}>Preço: R$ {peca?.preco?.toFixed(2)}</Text>
        <Text style={styles.vendedor}>Vendedor: {vendedor?.nome}</Text>
        <Text style={styles.descricaoTitle}>Descrição:</Text>
        <Text style={styles.descricaoText}>{peca?.descricao}</Text>
        <TouchableOpacity style={styles.comprarButton} onPress={handleFinalizarCompra}>
          <Text style={styles.comprarButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carrinhoButton} onPress={adicionarAoCarrinho}>
          <Text style={styles.carrinhoButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carrinhoButton} onPress={handleNavigateToCarrinho}>
          <Text style={styles.carrinhoButtonText}>Ir para o Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  pecaContainer: {
    marginBottom: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preco: {
    fontSize: 18,
    marginBottom: 10,
  },
  vendedor: {
    fontSize: 16,
    marginBottom: 10,
  },
  descricaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricaoText: {
    fontSize: 16,
    marginBottom: 20,
  },
  comprarButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  comprarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carrinhoButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  carrinhoButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Compras;