import api from "./api";

export const getTodo = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const createTodo = async (todo) => {
    const { data } = await api.post("/todos", todo);
    return data;
};

export const updateTodo = async (id, updatedTodo) => {
    const { data } = await api.put(`/todos/${id}`, updatedTodo);
    return data;
}