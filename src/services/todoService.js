import api from "./api";

export const getTodo = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const createTodo = async (todo) => {
    const { data } = await api.post("/todos", todo);
    return data;
};