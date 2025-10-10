import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, logout, refreshToken } from '../services/auth';

export function useAuth() {
  const queryClient = useQueryClient();

  // login de usuario
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      queryClient.setQueryData(["token"], data.token);
    },
  });

  // registro de usuario
  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }) => register(name, email, password), // ajustado
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      queryClient.setQueryData(["token"], data.token);
    },
  });

  // logout de usuario
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      queryClient.removeQueries(["token"]);
      queryClient.invalidateQueries();
    },
  });

  // atualizar token
  const refreshTokenMutation = useMutation({
    mutationFn: refreshToken,
    onSuccess: (newToken) => {
      queryClient.setQueryData(["token"], newToken);
    },
  });

  return {
    // Funções
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refreshToken: refreshTokenMutation.mutateAsync,

    // Status
    registerStatus: registerMutation.status,
    loginStatus: loginMutation.status,
    logoutStatus: logoutMutation.status,
    refreshTokenStatus: refreshTokenMutation.status,
  };

}