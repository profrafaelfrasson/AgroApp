import axios from "axios";
import { obterToken } from "./armazenamentoLocalService";

const api = axios.create({
    baseURL: "http://127.0.0.1:8080"
});

api.interceptors.request.use(async config => {
    const token = obterToken();
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
  
export default api;