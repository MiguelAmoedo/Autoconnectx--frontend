import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelecaoDePecas = () => {
const getPieceIdFromRoute = () => {
const route = navigation.dangerouslyGetState().routes.find((r) => r.name === 'CompraPagina');
return route?.params?.pecaId || null;
      };
      
  const navigation = useNavigation();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [pecas, setPecas] = useState([]);
  const [erro, setErro] = useState(null);
  const [exibirResultado, setExibirResultado] = useState(false); 
  useEffect(() => {
    const pieceId = getPieceIdFromRoute();
    if (pieceId) {
      // Faça o que for necessário com o ID da peça recuperado, como realizar uma requisição para obter os detalhes da peça.
      console.log('ID da peça:', pieceId);
    }
  }, []);
  

  const handleSelectPiece = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/pecas`);
      const data = await response.json();

      if (response.ok) {
        const filteredPecas = data.filter((peca) => {
          return (
            peca.marca.toLowerCase() === marca.toLowerCase() &&
            peca.modelo.toLowerCase() === modelo.toLowerCase() &&
            peca.ano === parseInt(ano)
          );
        });

        if (filteredPecas.length > 0) {
          setPecas(filteredPecas);
          setErro(null);
          setExibirResultado(true);
        } else {
          setPecas([]);
          setErro('Nenhuma peça compatível encontrada');
          setExibirResultado(true);
        }
      } else {
        setPecas([]);
        setErro('Erro ao obter as peças compatíveis');
        setExibirResultado(true);
      }
    } catch (error) {
      console.log('Ocorreu um erro ao fazer a requisição', error);
      setPecas([]);
      setErro('Erro ao obter as peças compatíveis');
      setExibirResultado(true);
    }
  };

  const handleBuy = (pecaId) => {
    navigation.navigate('CompraPagina', { pecaId });
    console.log('Redirecionar para a página de compra:', pecaId);
  };

  const handleReturn = () => {
    setMarca('');
    setModelo('');
    setAno('');
    setPecas([]);
    setErro(null);
    setExibirResultado(false);
  };

  return (
    <View style={styles.container}>
      {!exibirResultado ? (
        <View style={styles.form}>
          <Text style={styles.label}>Selecione o ano:</Text>
          <TextInput
            style={styles.input}
            value={ano}
            onChangeText={(text) => setAno(text)}
          />

          <Text style={styles.label}>Selecione a marca:</Text>
          <TextInput
            style={styles.input}
            value={marca}
            onChangeText={(text) => setMarca(text)}
          />

          <Text style={styles.label}>Selecione o modelo:</Text>
          <TextInput
            style={styles.input}
            value={modelo}
            onChangeText={(text) => setModelo(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSelectPiece}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          {pecas.length > 0 ? (
            <FlatList
              data={pecas}
              keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemTitle}>{item.nome}</Text>
                  <Text style={styles.itemSubtitle}>Marca: {item.marca}</Text>
                  <Text style={styles.itemSubtitle}>Modelo: {item.modelo}</Text>
                  <Text style={styles.itemSubtitle}>Ano: {item.ano}</Text>
                  <Text style={styles.itemSubtitle}>Preço: R$ {item.preco}</Text>
                  <Text style={styles.itemSubtitle}>Descrição: {item.descricao}</Text>
                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => handleBuy(item.id)}
                  >
                    <Text style={styles.buyButtonText}>Comprar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noResults}>Nenhum resultado encontrado</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleReturn}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {erro && <Text style={styles.error}>{erro}</Text>}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    width: '80%',
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSubtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  buyButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResults: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default SelecaoDePecas;
