import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:5000', // Altere para o endereço correto do backend
});

const adminService = {
  criarAdmin: async (adminData) => {
    const response = await api.post('/admin/cadastro', adminData);
    return response.data;
  },

  loginAdmin: async (adminCredentials) => {
    const response = await api.post('/admin/login', adminCredentials);
    return response.data;
  },

  validarTokenAdmin: async (token) => {
    const response = await api.post('/admin/validarToken', { token });
    return response.data;
  },

  createVendedor: async (vendedorData) => {
    const response = await api.post('/admin/vendedores', vendedorData);
    return response.data;
  },

  updateVendedor: async (id, vendedorData) => {
    const response = await api.put(`/admin/vendedores/${id}`, vendedorData);
    return response.data;
  },

  deleteVendedor: async (id) => {
    const response = await api.delete(`/admin/vendedores/${id}`);
    return response.data;
  },

  createPeca: async (pecaData) => {
    const response = await api.post('/admin/pecas', pecaData);
    return response.data;
  },

  updatePeca: async (id, pecaData) => {
    const response = await api.put(`/admin/pecas/${id}`, pecaData);
    return response.data;
  },

  deletePeca: async (id) => {
    const response = await api.delete(`/admin/pecas/${id}`);
    return response.data;
  },

  getAllClientes: async () => {
    const response = await api.get('/admin/clientes');
    return response.data;
  },

  getClienteById: async (id) => {
    const response = await api.get(`/admin/clientes/${id}`);
    return response.data;
  },

  getAllVendedores: async () => {
    const response = await api.get('/admin/vendedores');
    return response.data;
  },

  getVendedorById: async (id) => {
    const response = await api.get(`/admin/vendedores/${id}`);
    return response.data;
  },

  getAllPecas: async () => {
    const response = await api.get('/admin/pecas');
    return response.data;
  },

  getPecaById: async (id) => {
    const response = await api.get(`/admin/pecas/${id}`);
    return response.data;
  },

  getAllCompras: async () => {
    const response = await api.get('/admin/compras');
    return response.data;
  },

  getCompraById: async (id) => {
    const response = await api.get(`/admin/compras/${id}`);
    return response.data;
  },

  cancelarCompra: async (id) => {
    const response = await api.put(`/admin/compras/${id}/cancelar`);
    return response.data;
  },
};

export default adminService;
