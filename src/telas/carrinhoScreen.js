import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Carrinho = () => {
  const navigation = useNavigation();
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    getCarrinhoDoClienteLogado();
    retrieveLogIdCliente();
  }, []);

  const getCarrinhoDoClienteLogado = async () => {
    try {
      const logIdCliente = await AsyncStorage.getItem('logIdCliente');

      const response = await axios.get(`http://10.0.2.2:5000/compras/carrinhoget/${logIdCliente}`);
      setCarrinho(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Carrinho de compras vazio.');
    }
  };

  const retrieveLogIdCliente = async () => {
    try {
      const logIdCliente = await AsyncStorage.getItem('logIdCliente');
      if (logIdCliente !== null) {
        // O valor foi recuperado com sucesso
        console.log('ID do cliente:', logIdCliente);
        // Faça o que for necessário com o ID do cliente aqui
      } else {
        // O valor não existe no AsyncStorage
        console.log('ID do cliente não encontrado');
      }
    } catch (error) {
      // Ocorreu um erro ao tentar recuperar o valor do AsyncStorage
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nome}>{item.peca.nome}</Text>
      <Text style={styles.preco}>Preço: R$ {item.peca.preco.toFixed(2)}</Text>
      <TouchableOpacity style={styles.removerButton} onPress={() => removerItemCarrinho(item._id)}>
        <Text style={styles.removerButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  const finalizarCompra = async () => {
    try {
      const logIdCliente = await AsyncStorage.getItem('logIdCliente');

      const response = await axios.post(`http://10.0.2.2:5000/compras/finalizar/${logIdCliente}`);
      if (response.status === 200) {
        Alert.alert('Sucesso', response.data.message);
        const pecaId = carrinho.itens[0].peca._id; // Obtém o ID da primeira peça no carrinho
        navigation.navigate('CompraConfirmada', { pecaId }); // Redireciona para a tela "CompraConfirmada" com o parâmetro pecaId
      } else {
        Alert.alert('Erro', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao finalizar a compra.');
    }
  };

  const removerItemCarrinho = async (itemId) => {
    try {
      const logIdCliente = await AsyncStorage.getItem('logIdCliente')
      const response = await axios.delete(`http://10.0.2.2:5000/compras/removerCarrinho/${logIdCliente}`);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Item removido do carrinho');
        getCarrinhoDoClienteLogado(); // Atualiza o carrinho após remover o item
      } else {
        Alert.alert('Erro', response.data.mensagem);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao remover o item do carrinho.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Pedidos</Text>
      {carrinho.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={carrinho.itens}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          <Button title="Finalizar Compra" onPress={finalizarCompra} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  preco: {
    fontSize: 16,
  },
  removerButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  removerButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Carrinho;