import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'https://gerenciador-de-estabelecimento.herokuapp.com',
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      AsyncStorage.removeItem('@Gerenciador:token');
      AsyncStorage.removeItem('@Gerenciador:client');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
