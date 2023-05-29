// api.js

// Função para definir o token de autenticação nos cabeçalhos das requisições
export const setAuthToken = (token) => {
    if (token) {
      // Se um token válido for fornecido, adicione-o aos cabeçalhos das requisições
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      // Se o token for nulo, remova-o dos cabeçalhos das requisições
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  // Restante do código de chamadas de API...
  