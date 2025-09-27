import api from './axios';

interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (params: LoginPayload) => {
    const payload = { ...params };
    const response = await api.post(
      '/auth/login',
      new URLSearchParams(payload),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data;
};
