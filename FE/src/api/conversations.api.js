import axiosClient from '@/api/axios';

export const conversationsApi = {
    list: async () => {
        const response = await axiosClient.get('/conversations');
        return response;
    },
    create: async (data) => {
        const response = await axiosClient.post('/conversations', data);
        return response;
    },
};
