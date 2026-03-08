module.exports = (url) => {
    const parsedUrl = new URL(url);
    return {
        host: parsedUrl.hostname,
        port: parsedUrl.port,
        user: parsedUrl.username,
        password: parsedUrl.password,
        database: parsedUrl.pathname.slice(1),
    };
};