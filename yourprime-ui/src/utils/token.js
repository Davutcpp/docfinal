export const saveToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const getTokenPayload = () => {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
};

export const getCurrentUsername = () => {
    const payload = getTokenPayload();

    if (!payload) {
        return null;
    }

    return payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
};

export const isTokenExpired = () => {
    const payload = getTokenPayload();

    if (!payload) {
        return true;
    }

    const expiryTime = payload.exp * 1000;
    const currentTime = Date.now();

    return currentTime >= expiryTime;
};