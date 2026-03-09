const express = require('express');
const router = express.Router();

const authRoutes = require('@/modules/auth/auth.route');
const conversationRoutes = require('@/modules/conversations/conversation.route');
const userRoutes = require('@/modules/users/user.route');

router.use('/auth', authRoutes);
router.use('/conversations', conversationRoutes);
router.use('/users', userRoutes);

module.exports = router;
