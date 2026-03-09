const config = {
    apiUrl: import.meta.env.VITE_API_URL,
    pusher: {
        appKey: import.meta.env.VITE_PUSHER_APP_KEY,
        host: import.meta.env.VITE_PUSHER_HOST,
        port: import.meta.env.VITE_PUSHER_PORT,
    }
};

export default config;
