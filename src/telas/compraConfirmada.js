import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
      const response = await axios.get(`http://10.0.2.2:5000/pecas/${pecaId}`);
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
      const response = await axios.get(`http://10.0.2.2:5000/vendedores/${vendedorId}`);
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
      <Text style={styles.title}>Compra confirmada!</Text>
      <Text style={styles.message}>Sua compra foi confirmada com sucesso.</Text>
      <Text style={styles.idPeca}>Id da peça: {peca.idVendedor}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Entre em contato com o vendedor:</Text>
        <Text style={styles.info}>Nome: {vendedor.nome}</Text>
        <Text style={styles.info}>Telefone: {vendedor.telefone}</Text>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  idPeca: {
    fontSize: 16,
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3483fa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CompraConfirmada;
