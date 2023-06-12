import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CompraPagina({ route }) {
  const { idPeca } = route.params;
  const [peca, setPeca] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://10.0.2.2:5000/pecas/${idPeca}`)
      .then(response => response.json())
      .then(data => setPeca(data))
      .catch(error => console.error(error));
  }, [idPeca]);

  useEffect(() => {
    if (peca) {
      fetch(`http://10.0.2.2:5000/vendedores/${peca.idVendedor}`)
        .then(response => response.json())
        .then(data => setVendedor(data))
        .catch(error => console.error(error));
    }
  }, [peca]);

  if (!peca || !vendedor) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const handleComprar = () => {
    console.log('Compra realizada');
  };

  const handleAdicionarCarrinho = () => {
    Alert.prompt('Quantidade', 'Digite a quantidade desejada:', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Adicionar',
        onPress: (quantidade) => {
          const clienteId = 123; // Altere com o ID do cliente logado
          adicionarAoCarrinho(idPeca, clienteId, parseInt(quantidade));
        },
      },
    ]);
  };

  const adicionarAoCarrinho = (idPeca, clienteId, quantidade) => {
    // Enviar a requisição para adicionar ao carrinho
    fetch('http://10.0.2.2:5000/compras/carrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idPeca,
        clienteId,
        quantidade,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Item adicionado ao carrinho:', data);
        navigation.navigate('Carrinho'); // Navega para a tela do carrinho
      })
      .catch(error => console.error(error));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{peca.nome}</Text>
        <Text style={styles.price}>R$ {peca.preco}</Text>
        <Text style={styles.seller}>Vendedor: {vendedor.nome}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descrição:</Text>
          <Text style={styles.descriptionText}>{peca.descricao}</Text>
        </View>
        <TouchableOpacity style={styles.comprarButton} onPress={handleComprar}>
          <Text style={styles.comprarButtonText}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carrinhoButton} onPress={handleAdicionarCarrinho}>
          <Text style={styles.carrinhoButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: width * 0.75, // Aspect ratio 4:3
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007bff',
  },
  seller: {
    fontSize: 16,
    marginBottom: 8,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
  },
  comprarButton: {
    backgroundColor: '#5cc6ba',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  comprarButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  carrinhoButton: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  carrinhoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
  },
});
