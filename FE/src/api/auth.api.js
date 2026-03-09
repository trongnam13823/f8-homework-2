import axiosClient from '@/api/axios';

export const authApi = {
    register: async (data) => {
        const response = await axiosClient.post('/auth/register', data);
        return response;
    },
    login: async (data) => {
        const response = await axiosClient.post('/auth/login', data);
        return response;
    },
};
