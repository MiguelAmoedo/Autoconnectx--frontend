import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LerPecasVendedor = () => {
  const [pecas, setPecas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const vendedorId = await AsyncStorage.getItem('vendedorId');

      if (!authToken) {
        Alert.alert('Erro', 'Você não está autenticado. Faça o login primeiro');
        return;
      }

      const response = await fetch(`https://backend1-swart.vercel.app/vendedores/pecas/${vendedorId}`, {
        headers: {
          Authorization: authToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPecas(data);
      } else {
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao obter as peças do vendedor');
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja apagar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => deletePeca(id),
        },
      ],
      { cancelable: true }
    );
  };

  const deletePeca = async (id) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');

      if (!authToken) {
        Alert.alert('Erro', 'Você não está autenticado. Faça o login primeiro');
        return;
      }

      const response = await fetch(`https://backend1-swart.vercel.app/vendedores/pecas/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Peça apagada com sucesso');
        fetchData(); // Atualize a lista de peças após a exclusão
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao apagar a peça');
    }
  };

  const handleEdit = (peca) => {
    navigation.navigate('AdicionarPeca', { peca });
  };

  const filteredPecas = pecas.filter((peca) => peca.status !== 'Vendida' && peca.qtdEstoque > 0);

  const renderItem = ({ item }) => (
    <View style={styles.pecaContainer}>
      <View style={styles.buuttone}>
        <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.buutton}>
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.buutton}>
          <Text style={styles.buttonText}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Id:</Text>
        <Text style={styles.value}>{item._id}</Text>
        <View style={styles.imagemContainer}>
          <Image source={{ uri: item.imagem }} style={styles.imagemPeca} />
        </View>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{item.nome}</Text>

        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{item.marca}</Text>

        <Text style={styles.label}>Tipo de Peça:</Text>
        <Text style={styles.value}>{item.tipoDePeca}</Text>

        <Text style={styles.label}>Modelo:</Text>
        <Text style={styles.value}>{item.modelo}</Text>

        <Text style={styles.label}>Ano:</Text>
        <Text style={styles.value}>{item.ano}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{item.descricao}</Text>

        <Text style={styles.label}>Preço:</Text>
        <Text style={styles.value}>{item.preco}</Text>

        <Text style={styles.label}>Quantidade em Estoque:</Text>
        <Text style={styles.value}>{item.qtdEstoque}</Text>

        <Text style={styles.label}>Partes do Veículo:</Text>
        <Text style={styles.value}>{item.partesVeiculo}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peças Ativas</Text>
      {filteredPecas.length === 0 ? (
        <Text>Nenhuma peça encontrada.</Text>
      ) : (
        <FlatList
          data={filteredPecas}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'ghostwhite',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    left: 130,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  pecaContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'aliceblue',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Adiciona sombra no Android
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  buuttone: {
    flexDirection: 'row',
    left: 235,
  },
  buutton: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  infoContainer: {
    marginLeft: 0,
    right: 90,
  },
  separator: {
    height: 1,
    backgroundColor: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    marginBottom: 8,
  },
  imagemContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagemPeca: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default LerPecasVendedor;
