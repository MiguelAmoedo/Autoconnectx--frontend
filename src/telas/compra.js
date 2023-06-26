import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Compras = ({ route }) => {
  const { idPeca, token } = route.params;
  const [peca, setPeca] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`https://backend1-swart.vercel.app/pecas/${idPeca}`, {
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
      fetch(`https://backend1-swart.vercel.app/vendedores/${peca.idVendedor}`, {
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

      const response = await axios.post('https://backend1-swart.vercel.app/compras/carrinho', dados);

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

  const formatarData = (data) => {
    const dataFormatada = moment(data).format('DD/MM [às] HH:mm');
    return dataFormatada;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.linhaCinza} />
      <View style={styles.pecaContainer}>
        <Image source={{ uri: peca?.imagem }} style={styles.imagem} />
        <Text style={styles.preco}>R${peca?.preco?.toFixed(0)}</Text>
        <Text style={styles.nome}>{peca?.nome}</Text>
        
        <Text style={styles.publicadoEm}>
          Publicado em {formatarData(peca?.dataCadastro)}
        </Text>
        <Text style={styles.descricaoTitle}>Descrição:</Text>
        <Text style={styles.detalhes}>Tipo de peças: {peca?.tipoDePeca}</Text>
        <Text style={styles.detalhes}>Marca: {peca?.marca}</Text>
        <Text style={styles.detalhes}>Modelo: {peca?.modelo}</Text>
        <Text style={styles.detalhes}>Ano: {peca?.ano}</Text>
        <Text style={styles.vendedor}>Vendedor: {vendedor?.nome}</Text>
        <Text style={styles.descricaoText}>{peca?.descricao}</Text>
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
    backgroundColor: '#fff',
  },
  linhaCinza: {
    backgroundColor: '#ccc',
    height: 1,
    width: '100%',
    marginBottom: 20,
  },
  pecaContainer: {
    padding: 20,
    marginBottom: 20,
  },
  imagem: {
    width: '100%',
    height: Dimensions.get('window').width * 0.75, // Aspect ratio 4:3
    backgroundColor: '#ccc',
    marginBottom: 25,
  },
  nome: {
    fontSize: 20,
    marginBottom: 10,
  },
  preco: {
    fontSize: 30,
    marginBottom: 5,
  },
  vendedor: {
    fontSize: 16,
    marginBottom: 10,
  },
  publicadoEm: {
    fontSize: 12,
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
  detalhes: {
    fontSize: 16,
    marginBottom: 5,
  },
  carrinhoButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  carrinhoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Compras;
