import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CarrinhoScreen = () => {
  const [carrinho, setCarrinho] = useState([]);

  // Função para carregar os itens do carrinho do cliente
  const carregarCarrinho = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/${compraId}'); // Substitua pelo endpoint correto da sua API
      const carrinhoData = response.data;
      setCarrinho(carrinhoData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  // Função para remover um item do carrinho
  const removerItemCarrinho = async (itemId) => {
    try {
      await axios.delete(`http://10.0.2.2:5000/carrinho/${itemId}`); // Substitua pelo endpoint correto da sua API
      carregarCarrinho(); // Recarrega os itens do carrinho após a remoção
    } catch (error) {
      console.log(error);
    }
  };

  // Função para finalizar a compra
  const finalizarCompra = async () => {
    try {
      await axios.post(`http://10.0.2.2:5000/finalizar/${compraId}`); // Substitua pelo endpoint correto da sua API
      // Lógica adicional após a finalização da compra (redirecionar, exibir mensagem, etc.)
    } catch (error) {
      console.log(error);
    }
  };

  // Renderizar cada item do carrinho na lista
  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.nome}</Text>
      <Text>Preço: R$ {item.preco}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
      <TouchableOpacity onPress={() => removerItemCarrinho(item.id)}>
        <Text>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>Carrinho</Text>
      <FlatList
        data={carrinho}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={finalizarCompra} style={{ backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarrinhoScreen;
