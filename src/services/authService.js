import api from './api';

export const signup = async (values) =>{
    
    const {data} = await api.post('/signup',values)

    console.log(data);

    return data;
}