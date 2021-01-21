import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/apiClient';

interface AuthState {
  token: string;
  user: UserData;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: UserData;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GerenciadorDeEstabelecimentos:token');
    const user = localStorage.getItem('@GerenciadorDeEstabelecimentos:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions/login', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@GerenciadorDeEstabelecimentos:token', token);
    localStorage.setItem(
      '@GerenciadorDeEstabelecimentos:user',
      JSON.stringify(user)
    );

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GerenciadorDeEstabelecimentos:token');
    localStorage.removeItem('@GerenciadorDeEstabelecimentos:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user as UserData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
