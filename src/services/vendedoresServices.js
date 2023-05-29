const axios = require('axios');

const vendedoresService = {
  autenticarVendedor: async (vendedorData) => {
    try {
      const response = await axios.post('http://localhost:5000/vendedores/login', vendedorData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  adicionarPeca: async (pecaData) => {
    try {
      const response = await axios.post('http://localhost:5000/vendedores/pecas', pecaData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  atualizarPeca: async (id, pecaData) => {
    try {
      const response = await axios.put(`http://localhost:5000/vendedores/pecas/${id}`, pecaData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  excluirPeca: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/vendedores/pecas/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  visualizarPedidos: async () => {
    try {
      const response = await axios.get('http://localhost:5000/vendedores/pedidos');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  atualizarStatusPedido: async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/vendedores/pedidos/${id}`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  controlarEstoque: async () => {
    try {
      const response = await axios.get('http://localhost:5000/vendedores/estoque');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  visualizarRelatorios: async () => {
    try {
      const response = await axios.get('http://localhost:5000/vendedores/relatorios');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  visualizarInformacoesPessoais: async () => {
    try {
      const response = await axios.get('http://localhost:5000/vendedores/informacoes');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  atualizarInformacoesPessoais: async (vendedorData) => {
    try {
      const response = await axios.put('http://localhost:5000/vendedores/informacoes', vendedorData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  alterarSenha: async (senhaData) => {
    try {
      const response = await axios.put('http://localhost:5000/vendedores/senha', senhaData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

module.exports = vendedoresService;
