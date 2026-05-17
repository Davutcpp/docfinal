import axios from "axios";
import { getToken, isTokenExpired, removeToken } from "../utils/token";

const api = axios.create({
    baseURL: "http://localhost:5016/api"
});

api.interceptors.request.use((config) => {
    if (isTokenExpired()) {
        removeToken();

        if (window.location.pathname !== "/") {
            window.location.href = "/";
        }

        return config;
    }

    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;