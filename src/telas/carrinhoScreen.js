import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Button, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Carrinho = () => {
  const navigation = useNavigation();
  const [carrinho, setCarrinho] = useState([]);
  const [atualizarCarrinho, setAtualizarCarrinho] = useState(false);

  useEffect(() => {
    getCarrinhoDoClienteLogado();
    retrieveLogIdCliente();
  }, [atualizarCarrinho]);

  const getCarrinhoDoClienteLogado = async () => {
    try {
      const logIdCliente = await AsyncStorage.getItem('logIdCliente');
  
      const response = await axios.get(`https://backend1-swart.vercel.app/compras/carrinhoget/${logIdCliente}`);
      setCarrinho(response.data);
    } catch (error) {
      Alert.alert('Atenção', 'Carrinho de compras vazio.');
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
      {item.peca.imagem && (
        <Image source={{ uri: item.peca.imagem }} style={styles.imagem} resizeMode="contain" />
      )}
      <TouchableOpacity style={styles.removerButton} onPress={() => removerItemCarrinho(item.peca._id)}>
        <Text style={styles.removerButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  const finalizarCompra = async () => {
    try {
      const logIdCliente = await AsyncStorage.getItem('logIdCliente');

      const response = await axios.post(`https://backend1-swart.vercel.app/compras/finalizar/${logIdCliente}`);
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
      const response = await axios.delete(`https://backend1-swart.vercel.app/compras/ola/${carrinho._id}`);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Item removido do carrinho');
        setAtualizarCarrinho(true); // Atualiza a variável de estado para acionar o useEffect
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
  imagem: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default Carrinho;
