import api from "../api/axios";

export const getMyTeam = async () => {
    const response = await api.get("/Team/my-team");
    return response.data;
};

export const kickUser = async (userId) => {
    const response = await api.post(`/Team/kick/${userId}`);
    return response.data;
};

export const makeCaptain = async (newCaptainId) => {
    const response = await api.post(`/Team/make-captain/${newCaptainId}`);
    return response.data;
};

export const getTeamRequests = async () => {
    const response = await api.get("/Team/requests");
    return response.data;
};

export const acceptRequest = async (userId) => {
    const response = await api.post(`/Team/accept/${userId}`);
    return response.data;
};

export const rejectRequest = async (userId) => {
    const response = await api.post(`/Team/reject/${userId}`);
    return response.data;
};

export const leaveTeam = async () => {
    const response = await api.post("/Team/leave");
    return response.data;
};



export const uploadTeamAvatar = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/Team/avatar", formData, {
        headers: {"Content-Type": "multipart/form-data"}
    });
    return response.data;
};



export const updateTeamName = async (name) => {
    const response = await api.put("/Team/name", {
        name: name
    });
    return response.data;
};
