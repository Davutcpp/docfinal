import api from "../api/axios";

export const register = async (data) => {
    const response = await api.post("/Auth/register", data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post("/Auth/login", data);
    return response.data;
};