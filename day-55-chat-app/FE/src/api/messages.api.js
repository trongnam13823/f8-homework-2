import axiosClient from '@/api/axios';

export const messagesApi = {
    list: async (conversationId, params) => {
        const { limit = 20, before } = params || {};

        const response = await axiosClient.get(
            `/conversations/${conversationId}/messages`,
            {
                params: {
                    limit,
                    before,
                },
            }
        );

        return response;
    },
    create: async (conversationId, data) => {
        const response = await axiosClient.post(`/conversations/${conversationId}/messages`, data);
        return response;
    },
};
