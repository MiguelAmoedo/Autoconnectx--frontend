import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';

const CompraConfirmada = ({ route }) => {
  const { pecaId } = route.params;
  const [peca, setPeca] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPeca();
  }, []);

  const fetchPeca = async () => {
    try {
      const response = await axios.get(`https://backend1-swart.vercel.app/pecas/${pecaId}`);
      setPeca(response.data);

      const vendedorId = response.data?.idVendedor;
      if (vendedorId) {
        fetchVendedor(vendedorId);
      }
    } catch (error) {
      setError('Falha ao carregar a peça. Por favor, tente novamente mais tarde.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendedor = async (vendedorId) => {
    try {
      const response = await axios.get(`https://backend1-swart.vercel.app/vendedores/${vendedorId}`);
      setVendedor(response.data);
    } catch (error) {
      setError('Falha ao carregar o vendedor. Por favor, tente novamente mais tarde.');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#128C7E" />
        <Text style={styles.message}>Carregando...</Text>
      </View>
    );
  }

  if (error || !peca || !vendedor) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Não foi possível carregar os dados da compra.</Text>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
  
      <Text style={styles.title}>Pedido Confirmado!</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: peca.imagem }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Código de Transação:</Text>
        <Text style={styles.idPeca}>{peca._id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Peça:</Text>
        <Text style={styles.pecaNome}>{peca.nome}</Text>
      </View>
      <View style={styles.vendedorContainer}>
        <Text style={styles.info}>Vendedor:</Text>
        <Text style={styles.vendedorNome}>{vendedor.nome}</Text>
      </View>
      <View style={styles.vendedorContainer}>
        <Text style={styles.info}>Telefone:</Text>
        <Text style={styles.vendedorTelefone}>{vendedor.telefone}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Linking.openURL(`https://wa.me/${vendedor.telefone}?text=Olá, tenho interesse na peça: ${peca.nome}`)
        }
      >
        <Text style={styles.buttonText}>Entrar em contato via WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#292929',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  alertText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FF0000',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#616161',
    fontWeight: "bold"
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: 200,
    height: 200,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#616161',
  },
  pecaNome: {
    fontSize: 16,
    marginBottom: 20,
    color: '#128C7E',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  vendedorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  vendedorNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#128C7E',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  vendedorTelefone: {
    fontSize: 16,
    color: '#616161',
  },
  button: {
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#616161',
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
});

export default CompraConfirmada;
