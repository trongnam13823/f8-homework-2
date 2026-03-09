module.exports = {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    host: process.env.PUSHER_HOST,
    port: process.env.PUSHER_PORT,
    useTLS: process.env.PUSHER_USE_TLS === 'true',
};
