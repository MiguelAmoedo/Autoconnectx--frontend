import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';

const CompraConfirmada = ({ route }) => {
  const { pecaId } = route.params;
  const [peca, setPeca] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const [loading, setLoading] = useState(true);

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
      console.error(error);
    }
  };

  const fetchVendedor = async (vendedorId) => {
    try {
      const response = await axios.get(`https://backend1-swart.vercel.app/vendedores/${vendedorId}`);
      setVendedor(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Carregando...</Text>
      </View>
    );
  }

  if (!peca || !vendedor) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Não foi possível carregar os dados da compra.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido confirmado!</Text>
      <Text style={styles.message}>Seu pedido foi confirmado com sucesso.</Text>
      <Text style={styles.idPeca}>cod transação: {peca._id}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Entre em contato com o vendedor:</Text>
        <Text style={styles.info}>Nome: {vendedor.nome}</Text>
        <Text style={styles.info}>Telefone: {vendedor.telefone}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Linking.openURL(`https://wa.me/${vendedor.telefone}?text=Olá, tenho interesse na peça: ${peca.nome}`)
          }
        >
          <Text style={styles.buttonText}>Entrar em contato via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#292929',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#616161',
  },
  idPeca: {
    fontSize: 16,
    marginBottom: 10,
    color: '#616161',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#616161',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CompraConfirmada;

