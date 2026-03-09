import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import config from '@/config/config';

const axiosClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function onFulfilled(response) {
        return response.data;
    },
    function onRejected(error) {
        if (error.response.data.message.includes('token')) {
            useAuthStore.getState().logout()
        }
        return Promise.reject(error.response.data);
    });

export default axiosClient;
