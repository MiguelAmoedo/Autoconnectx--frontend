import axios from 'axios';

const baseURL = 'http://10.0.2.2:5000'; 
const pecasService = {
  getEstoque: () => {
    return axios.get(`${baseURL}/pecas`);
  },

  addPeca: (peca) => {
    return axios.post(`${baseURL}/pecas`, peca);
  },

  updatePeca: (id, peca) => {
    return axios.put(`${baseURL}/pecas/${id}`, peca);
  },

  deletePeca: (id) => {
    return axios.delete(`${baseURL}/pecas/${id}`);
  },
};

export default pecasService;
