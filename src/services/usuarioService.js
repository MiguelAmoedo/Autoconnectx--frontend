import axios from 'axios';


var usuarioService = {
  
  // método para cadastrar um usuário
  postUsuario: async (Cadastro) => {
    var usuarioAPI = axios.post(`http://10.0.2.2:5000/apiusuario/`,Cadastro);
    return await usuarioAPI;
  },

  // método para validar o login do usuário
  loginUsuario: async (email, senha) => {
    var usuarioAPI = axios.post(`http://10.0.2.2:5000/apiusuario/user`, { email, senha });
    return await usuarioAPI;
  }
}

export default usuarioService;