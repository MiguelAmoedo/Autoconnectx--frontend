import axios from 'axios';

const baseURL = 'http://10.0.2.2:5000'; // Altere o endereço IP e a porta conforme necessário

const loginService = {
  loginCliente: (dadosLogin) => {
    return axios.post(`${baseURL}/login/cliente`, );
  },

  cadastrarCliente: (dadosCadastro) => {
    return axios.post(`${baseURL}/login/cliente/cadastro`, );
  },

  loginVendedor: (dadosLogin) => {
    return axios.post(`${baseURL}/login/vendedor`, );
  },

  cadastrarVendedor: (dadosCadastro) => {
    return axios.post(`${baseURL}/login/vendedor/cadastro`, );
  },

  validarToken: (token) => {
    return axios.post(`${baseURL}/login/validarToken`, { token });
  },
};

export default loginService;
