import api from "./api";

export const signup = async (values) => {
  const { data } = await api.post("/signup", values);

  return data;
};

export const login = async (values) => {
  const { data } = await api.post("/login", values);
  return data;
};
