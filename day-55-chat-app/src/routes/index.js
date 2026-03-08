const express = require('express');
const router = express.Router();

const authRoutes = require('@/modules/auth/auth.route');
const conversationRoutes = require('@/modules/conversations/conversation.route');

router.use('/auth', authRoutes);
router.use('/conversations', conversationRoutes);

module.exports = router;
