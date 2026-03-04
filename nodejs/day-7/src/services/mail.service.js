const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const mailConfig = require('@/config/mail.config');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport(mailConfig);
    }

    async sendMail(to, subject, templateName, data) {
        const templatePath = path.join(__dirname, '../resources/views/mail', `${templateName}.ejs`);

        try {
            const html = await ejs.renderFile(templatePath, data);

            const mailOptions = {
                from: process.env.MAIL_FROM || process.env.MAIL_USER,
                to,
                subject,
                html,
            };

            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    async sendVerificationEmail(to, verificationLink) {
        return this.sendMail(
            to,
            'Verify Your Email - F8 Project',
            'auth/verify',
            { verificationLink }
        );
    }
}

module.exports = new MailService();
