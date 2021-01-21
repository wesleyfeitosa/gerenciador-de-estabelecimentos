import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gerenciador-de-estabelecimento.herokuapp.com',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('@GerenciadorDeEstabelecimentos:token');
      localStorage.removeItem('@GerenciadorDeEstabelecimentos:user');
      window.location.href = window.location.origin;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
