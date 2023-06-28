import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PecasVendidas = () => {
  const [pecas, setPecas] = useState([]);

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
        const pecasVendidas = data.filter(peca => peca.status === 'Vendida');
        setPecas(pecasVendidas);
      } else {
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao obter as peças vendidas do vendedor');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.pecaContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Id:</Text>
        <Text style={styles.value}>{item._id}</Text>

        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{item.nome}</Text>

        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{item.marca}</Text>

        {/* ... Renderizar outros campos da peça ... */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Vendas :</Text>
      {pecas.length === 0 ? (
        <Text>Nenhuma peça vendida encontrada.</Text>
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
  infoContainer: {
    marginLeft: 16,
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

export default PecasVendidas;
