import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../services/expenses";

export function useExpense() {
  const queryClient = useQueryClient();

  //busca todas as despesas
  const {
    data: expenses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  // Adiciona nova despesa
  const addMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: (newExpense) => {
      queryClient.setQueryData(["expenses"], (old = []) => 
        [
        ...old,
        newExpense,
      ]);
    },
  });

  // Atualiza despesa existente
  const updateMutation = useMutation({
    mutationFn: ({ id, expense }) => updateExpense(id, expense),
    onSuccess: (updated) => {
      queryClient.setQueryData(["expenses"], (old = []) =>
        old.map((exp) => 
          (exp.id === updated.id ? updated : exp))
      );
    },
  });

  // Deleta despesa
  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["expenses"], (old = []) =>
        old.filter((exp) => exp.id !== deletedId)
      );
    },
  });

  return {
    expenses,
    isLoading,
    isError,
    error,
    refetch,
    addExpense: addMutation.mutateAsync,
    updateExpense: updateMutation.mutateAsync,
    deleteExpense: deleteMutation.mutateAsync,
    addStatus: addMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}
