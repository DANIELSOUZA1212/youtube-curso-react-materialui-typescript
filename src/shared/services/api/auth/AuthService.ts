/* eslint-disable linebreak-style */
import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    // 👇 CORREÇÕES APLICADAS:
    // 1. Mude de GET para POST
    // 2. Use a URL correta '/entrar'
    // 3. Envie os dados no body corretamente
    const { data } = await Api.post('/entrar', { email, password });

    if (data && data.accessToken) {
      return data;
    }

    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

export const AuthService = {
  auth,
};