import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultadoFiltro() {
  const navigation = useNavigation();
  const route = useRoute();
  const { marca, modelo, ano, token } = route.params;
  const [pecas, setPecas] = useState([]);

  const buscarPecas = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/pecas/pesquisa?marca=${marca}&modelo=${modelo}&ano=${ano}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Verifica se há peças correspondentes aos filtros
      if (Array.isArray(data.result) && data.result.length > 0) {
        setPecas(data.result);
      } else {
        setPecas([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscarPecas();
  }, []);

  const handleComprar = (idPeca) => {
    navigation.navigate('CompraPagina', { idPeca });
  };

  const renderItem = ({ item }) => (
    <View style={styles.pecaContainer}>
      <View style={styles.imagemContainer}>
        <Image source={{ uri: item.imagem }} style={styles.imagemPeca} />
      </View>
      <Text style={styles.pecaNome}>{item.nome}</Text>
      <Text style={styles.pecaValor}>R$ {item.preco}</Text>
      <Text style={styles.partesVeiculo}>{item.partesVeiculo}</Text>
      <TouchableOpacity style={styles.comprarButton} onPress={() => handleComprar(item._id)}>
        <Text style={styles.comprarButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Resultado do Filtro</Text>

      {pecas.length > 0 ? (
        <FlatList
          data={pecas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhuma peça encontrada</Text>
      )}

      <TouchableOpacity style={styles.voltarButton} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  pecaContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
  imagemContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  imagemPeca: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  pecaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pecaValor: {
    fontSize: 16,
    marginBottom: 5,
  },
  partesVeiculo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  comprarButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  comprarButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
  },
  voltarButton: {
    marginTop: 20,
    backgroundColor: '#888',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  voltarButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
