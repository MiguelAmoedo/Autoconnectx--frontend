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
      // Aqui você pode fazer a requisição ao backend para buscar as peças com base nos critérios selecionados
      const response = await fetch(`http://10.0.2.2:5000/pecas?marca=${marca}&modelo=${modelo}&ano=${ano}}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Verifica se há peças correspondentes aos filtros
      if (Array.isArray(data) && data.length > 0) {
        setPecas(data);
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

const { width } = Dimensions.get('window');
const itemWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContentContainer: {
    paddingBottom: 32,
  },
  pecaContainer: {
    marginBottom: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  imagemContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  imagemPeca: {
    width: 100,
    height: 100,
  },
  pecaNome: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  pecaValor: {
    fontSize: 16,
    marginBottom: 8,
  },
  partesVeiculo: {
    fontSize: 14,
    color: '#888',
  },
  comprarButton: {
    backgroundColor: '#5cc6ba',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  comprarButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  voltarButton: {
    backgroundColor: 'gray',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  voltarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
