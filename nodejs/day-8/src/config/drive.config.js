const driveConfig = {
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    dirId: process.env.GOOGLE_DRIVE_DIR_ID,
};

module.exports = driveConfig;
