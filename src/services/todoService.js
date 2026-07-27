import api from "./api";

export const getTodo=async()=>{
    const {data}= await api.get ("/todos")
    return data;
}