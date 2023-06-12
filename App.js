import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
//SelecioneSuaPeca
//GerenciarPeca
//CompraPagina
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={CadastroCliente} />
        <Stack.Screen name="CadastroVendedor" component={CadastroVendedor} />
        <Stack.Screen name="Login" component={LoginCliente} />
        <Stack.Screen name="LoginVendedor" component={LoginVendedorScreen} />
        <Stack.Screen name="Filtro" component={Filtro} />
        <Stack.Screen name="VendorControlScreen" component={VendorControlScreen} />
        <Stack.Screen name="AdicionarPeca" component={AdicionarPeca} />
        <Stack.Screen name="GerenciarPeca" component={GerenciarPeca} />
        <Stack.Screen name="ResultadoFiltro" component={ResultadoFiltro} />
        <Stack.Screen name="CompraPagina" component={CompraPagina} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
