import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompraPagina({ route }) {
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
    if (peca) {
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

  if (!peca || !vendedor) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const handleFinalizarCompra = () => {
    console.log('Compra finalizada');
  };

  const handleComprar = () => {
    console.log('Compra realizada');
  };

  const handleAdicionarCarrinho = async () => {
    try {
      const clienteId = await AsyncStorage.getItem('clienteId');
      navigation.navigate('CarrinhoScreen', { idCliente: clienteId, token });
    } catch (error) {
      console.error('Erro ao obter o ID do cliente do AsyncStorage:', error);
    }
  };

  
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.pecaContainer}>
        <Text style={styles.nome}>{peca.nome}</Text>
        <Text style={styles.preco}>Preço: R$ {peca.preco.toFixed(2)}</Text>
        <Text style={styles.vendedor}>Vendedor: {vendedor.nome}</Text>
        <Text style={styles.descricaoTitle}>Descrição:</Text>
        <Text style={styles.descricaoText}>{peca.descricao}</Text>
        <TouchableOpacity style={styles.comprarButton} onPress={handleComprar}>
          <Text style={styles.comprarButtonText}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carrinhoButton} onPress={handleAdicionarCarrinho}>
          <Text style={styles.carrinhoButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carrinhoButton} onPress={handleFinalizarCompra}>
          <Text style={styles.carrinhoButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  pecaContainer: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    marginBottom: 8,
  },
  vendedor: {
    fontSize: 16,
    marginBottom: 16,
  },
  descricaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descricaoText: {
    fontSize: 16,
    marginBottom: 16,
  },
  comprarButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  comprarButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  carrinhoButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  carrinhoButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
