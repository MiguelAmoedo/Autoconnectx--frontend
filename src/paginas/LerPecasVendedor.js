import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
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

      const response = await fetch(`http://10.0.2.2:5000/vendedores/pecas/${vendedorId}`, {
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

      const response = await fetch(`http://10.0.2.2:5000/vendedores/pecas/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Peça apagada com sucesso');
        fetchData(); // Atualize a lista de peças após a exclusão
      } else {
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

  const renderItem = ({ item }) => (
    <View style={styles.pecaContainer}>
      <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
        <Text style={styles.editButtonText}>A</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Id:</Text>
        <Text style={styles.value}>{item._id}</Text>

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
      <Text style={styles.title}>Peças do Vendedor:</Text>
      {pecas.length === 0 ? (
        <Text>Nenhuma peça encontrada.</Text>
      ) : (
        <FlatList
          data={pecas}
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
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
    backgroundColor: '#F5F5F5',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    top: 8,
    left: 32,
    backgroundColor: 'green',
    borderRadius: 4,
    padding: 4,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginLeft: 56,
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
});

export default LerPecasVendedor;
