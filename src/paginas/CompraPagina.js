import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CompraPagina = ({ route }) => {
    console.log('pecaId:', route.params.pecaId); // Verifica o valor de pecaId
  
    const { pecaId } = route.params;
    const [peca, setPeca] = useState(null);
    const [vendedor, setVendedor] = useState(null);
  
    useEffect(() => {
      fetch(`http://10.0.2.2:5000/pecas/${pecaId}`)
        .then((response) => response.json())
        .then((data) => setPeca(data))
        .catch((error) => console.log('Erro ao obter informações da peça:', error));
    }, [pecaId]);

  useEffect(() => {
    if (peca && peca.vendedorId) {
      fetch(`http://10.0.2.2:5000/vendedores/${peca.vendedorId}`)
        .then((response) => response.json())
        .then((data) => setVendedor(data))
        .catch((error) => console.log('Erro ao obter informações do vendedor:', error));
    }
  }, [peca]);

  if (!peca || !vendedor) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{peca.nome}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>R$ {peca.preco}</Text>
      </View>

      <View style={styles.vendedorContainer}>
        <Text style={styles.vendedorText}>Vendedor: {vendedor.nome}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{peca.descricao}</Text>
      </View>

      {/* Aqui você pode adicionar mais informações ou componentes conforme necessário */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  priceContainer: {
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  vendedorContainer: {
    marginBottom: 16,
  },
  vendedorText: {
    fontSize: 18,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
  },
});

export default CompraPagina;
