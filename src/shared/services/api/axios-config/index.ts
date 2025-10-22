/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable linebreak-style */
import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';
import { Environment } from '../../../environment';
import type { AxiosRequestConfig } from 'axios';

const Api = axios.create({
  baseURL: Environment.URL_BASE
});

// interceptor de requisição com checagens de segurança e tipagem
Api.interceptors.request.use(
  (config: AxiosRequestConfig = {}) => {
    try {
      const token = localStorage.getItem('APP_ACCESS_TOKEN');
      if (token) {
        const parsedToken = JSON.parse(token);

        // garante que headers existe
        config.headers = config.headers ?? {};

        // duas formas seguras de setar o Authorization:

        // 1) atribuindo direto (fazendo um cast para any para evitar erro de tipagem)
        (config.headers as any).Authorization = `Bearer ${parsedToken}`;

        // ou 2) sobrescrevendo de forma imutável (sem cast):
        // config.headers = {
        //   ...config.headers,
        //   Authorization: `Bearer ${parsedToken}`,
        // };
      }
    } catch (e) {
      // se algo der errado no parse, apenas não adiciona o header
      // console.error('Erro ao recuperar token', e);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };
