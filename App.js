import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './src/telas/home';
import CadastroCliente from './src/telas/clienteCadastro';
import CadastroVendedor from './src/telas/vendedorCadastro';
import LoginCliente from './src/telas/loginCliente';
import LoginVendedorScreen from './src/telas/loginVendedor';
import Filtro from './src/telas/filtro';
import VendorControlScreen from './src/telas/VendorControlScreen';
import AdicionarPeca from './src/telas/adicionarPeca';
import GerenciarPeca from './src/telas/gerenciarPeca';
import ResultadoFiltro from './src/telas/resultadoFiltro';
import CompraPagina from './src/telas/compra';
import Carrinho from './src/telas/carrinhoScreen';
import AddToCartScreen from './src/telas/testeCart';
import CompraConfirmada from './src/telas/compraConfirmada';
import Logo from './src/assets/logo.png';

const Stack = createStackNavigator();

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Carrinho')}>
        <Ionicons name="cart" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff', // Defina a cor de fundo desejada para a barra superior
          },
          headerTintColor: '#000', // Defina a cor do texto e dos ícones da barra superior
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroCliente}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="CadastroVendedor"
          component={CadastroVendedor}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginCliente}
        />
        <Stack.Screen
          name="LoginVendedor"
          component={LoginVendedorScreen}
        />
        <Stack.Screen
          name="Filtro"
          component={Filtro}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="VendorControlScreen"
          component={VendorControlScreen}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="AdicionarPeca"
          component={AdicionarPeca}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="GerenciarPeca"
          component={GerenciarPeca}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ResultadoFiltro"
          component={ResultadoFiltro}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="CompraPagina"
          component={CompraPagina}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="AddToCartScreen"
          component={AddToCartScreen}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
         <Stack.Screen
          name="CompraConfirmada"
          component={CompraConfirmada}
          options={({ navigation }) => ({
            headerTitle: () => <Header title="AutoConnectX" navigation={navigation} />,
          })}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 130,
    paddingVertical: 10,
    paddingBottom: 50
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    alignItems: 'center',
    textAlign: 'center'
  },
  cartButton: {
    position: 'absolute',
    paddingHorizontal: 270,
    paddingVertical: 9,
    bottom: 8,
    left: 8,
    padding: 8,
  },
 
});

export default App;
