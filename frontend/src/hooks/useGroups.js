import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroups, addGroup, updateGroup, deleteGroup } from "../services/groups";

export function useGroup() {
  const queryClient = useQueryClient();

  // Buscar todos os grupos
  const groupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    staleTime: 1000 * 60 * 5, // 5 minutos em cache
  });

  // Adiciona grupo
  const addMutation = useMutation({
    mutationFn: addGroup,
    onSuccess: (newGroup) => {
      queryClient.setQueryData(["groups"], (old = []) => [...old, newGroup]);
    },
  });

  // Atualizar grupo
  const updateMutation = useMutation({
    mutationFn: ({ id, group }) => updateGroup(id, group),
    onSuccess: (updated) => {
      queryClient.setQueryData(["groups"], (old = []) =>
        old.map((g) => (g.id === updated.id ? updated : g))
      );
    },
  });

  // Deletar grupo
  const deleteMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["groups"], (old = []) =>
        old.filter((g) => g.id !== deletedId)
      );
    },
  });

  return {
    // Query
    ...groupsQuery, 

    // Mutations
    addGroup: addMutation.mutateAsync,
    updateGroup: updateMutation.mutateAsync,
    deleteGroup: deleteMutation.mutateAsync,

    // Status das mutations
    addStatus: addMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}
