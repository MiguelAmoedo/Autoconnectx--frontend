import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const AddToCartScreen = () => {
  const [clienteId, setClienteId] = useState('');
  const [pecaId, setPecaId] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const handleAddToCart = () => {
    const data = {
      clienteId,
      pecaId,
      quantidade
    };

    fetch('https://backend1-swart.vercel.app/compras/carrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log('Item adicionado ao carrinho:', result);
      })
      .catch(error => {
        console.error('Erro ao adicionar item ao carrinho:', error);
      });
  };

  return (
    <View>
      <Text>Adicionar ao Carrinho</Text>
      <TextInput
        placeholder="ID do Cliente"
        value={clienteId}
        onChangeText={text => setClienteId(text)}
      />
      <TextInput
        placeholder="ID da Peça"
        value={pecaId}
        onChangeText={text => setPecaId(text)}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade.toString()}
        onChangeText={text => setQuantidade(parseInt(text))}
        keyboardType="numeric"
      />
      <Button title="Adicionar ao Carrinho" onPress={handleAddToCart} />
    </View>
  );
};

export default AddToCartScreen;
