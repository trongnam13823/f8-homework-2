const nodemailer = require('nodemailer');

const mailConfig = {
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
};

module.exports = mailConfig;
