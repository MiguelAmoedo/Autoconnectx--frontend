import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CompraPagina = ({ route }) => {
  // Extract the pieceId from the route parameters
  const { pecaId } = route.params;

  // Fetch the piece data using the pecaId and display the information

  // Handle the purchase process

  return (
    <View style={styles.container}>
      {/* Display the piece information */}
      <Text style={styles.title}>Peça ID: {pecaId}</Text>
      {/* Display other information about the piece */}
      
      {/* Button to proceed with the purchase */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompraPagina;
