const mailService = require('@/services/mail.service');

/**
 * Task: Send Password Change Notification Email
 * @param {Object} payload { email, changedAt }
 */
module.exports = async (payload) => {
    const { email, changedAt } = JSON.parse(payload);
    await mailService.sendPasswordChangedEmail(email, changedAt);
    console.log(`[Queue] Password change notification sent to ${email}`);
};
