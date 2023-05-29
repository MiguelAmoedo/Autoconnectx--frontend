import axios from 'axios';

const clientesService = {
  registerCliente: async (clienteData) => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/clientes/', clienteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  loginCliente: async (clienteData) => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/clientes/login', clienteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  updateCliente: async (id, clienteData) => {
    try {
      const response = await axios.put(`http://10.0.2.2:5000/clientes/${id}`, clienteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  deleteCliente: async (id) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:5000/clientes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default clientesService;
