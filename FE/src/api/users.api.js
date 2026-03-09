import axiosClient from '@/api/axios';

export const usersApi = {
    search: async (email) => {
        const response = await axiosClient.get('/users/search', {
            params: { email }
        });
        return response;
    },
};
