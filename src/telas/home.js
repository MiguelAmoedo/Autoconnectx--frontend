import React from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bgauto.jpg')}
        style={styles.backgroundImage}
      >
        <Image 
          source={require('../assets/aclogoinitial.png')}
          style={styles.logo}
        />

        <Text style={styles.slogan}>Encontre suas peças com facilidade!</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 150,
    position: 'absolute',
    top: -20,
    right: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 50,
    top: 300,
    
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  slogan: {
    color: '#fff',
    top: 280,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;
