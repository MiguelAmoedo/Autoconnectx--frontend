import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import axios from 'axios';

const CarrinhoScreen = ({ route }) => {
  const [carrinho, setCarrinho] = useState(null);
  const { idCliente, token } = route.params;

  useEffect(() => {
    fetchCarrinho();
  }, []);

  const fetchCarrinho = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/carrinhoget/${idCliente}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCarrinho(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (carrinho && carrinho.itens.length === 0) {
      Alert.alert('Carrinho Vazio', 'Seu carrinho de compras está vazio');
    }
  }, [carrinho]);

  return (
    <View>
      <Text>Carrinho de Compras</Text>
      {carrinho && carrinho.itens.length > 0 ? (
        <FlatList
          data={carrinho.itens}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.peca.nome}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
              <Text>Preço Unitário: {item.precoUnitario}</Text>
              <Text>Preço Total: {item.precoTotal}</Text>
            </View>
          )}
        />
      ) : (
        <Text>O carrinho está vazio</Text>
      )}
    </View>
  );
};

export default CarrinhoScreen;
