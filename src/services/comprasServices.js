import axios from 'axios';

const baseURL = 'http://10.0.2.2:5000'; // Altere o endereço IP e a porta conforme necessário

const compraService = {
  adicionarItemCarrinho: (dadosCompra) => {
    return axios.post(`${baseURL}/compras/carrinho`, dadosCompra);
  },

  removerItemCarrinho: (pecaId) => {
    return axios.delete(`${baseURL}/compras/carrinho/${pecaId}`);
  },

  finalizarCompra: (compraId) => {
    return axios.post(`${baseURL}/compras/finalizar/${compraId}`);
  },

  obterDetalhesCompra: (compraId) => {
    return axios.get(`${baseURL}/compras/${compraId}`);
  },

  cancelarCompra: (compraId) => {
    return axios.put(`${baseURL}/compras/cancelar/${compraId}`);
  },

  getAllCompras: () => {
    return axios.get(`${baseURL}/compras`);
  },
};

export default compraService;
