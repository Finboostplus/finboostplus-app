import api from "./api";

// Busca todas as despesas do usuário
export const getExpenses = async () => {
  const response = await api.get("/expenses");

  return response.data;
};

// Cria uma nova despesa
export const addExpense = async (expense) => {
  const response = await api.post("/expenses", expense);

  return response.data;
};

// Atualiza uma despesa existente pelo id
export const updateExpense = async (id, expense) => {
  const response = await api.put(`/expenses/${id}`, expense);

  return response.data;
};

// Remove uma despesa pelo id
export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);

  return response.data;
};
