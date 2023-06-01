import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroCliente from './src/paginas/cadastroCliente';
import CadastroVendedor from './src/paginas/cadastroVendedor';
import LoginCliente from './src/paginas/loginCliente';
import LoginVendedorScreen from './src/paginas/loginVendedor';
import AdicionarPeca from './src/paginas/adicionarPeca';
import VendorControlScreen from './src/paginas/VendorControlScreen ';
import LerPecasVendedor from './src/paginas/LerPecasVendedor';

import Home from './src/paginas/home';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Cadastro" component={CadastroCliente} />
        <Stack.Screen name="CadastroVendedor" component={CadastroVendedor} />
        <Stack.Screen name="Login" component={LoginCliente} />
        <Stack.Screen name="LoginVendedor" component={LoginVendedorScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AdicionarPeca" component={AdicionarPeca} />
        <Stack.Screen name="VendorControlScreen" component={VendorControlScreen} />
        <Stack.Screen name="LerPecasVendedor" component={LerPecasVendedor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
