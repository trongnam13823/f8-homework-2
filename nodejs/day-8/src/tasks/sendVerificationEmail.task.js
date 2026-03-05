const mailService = require('@/services/mail.service');

/**
 * Task: Send Verification Email
 * @param {Object} payload { email, verificationLink }
 */
module.exports = async (payload) => {
    const { email, verificationLink } = JSON.parse(payload);
    await mailService.sendVerificationEmail(email, verificationLink);
    console.log(`[Queue] Verification email sent to ${email}`);
};
