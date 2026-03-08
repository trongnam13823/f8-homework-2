const express = require('express');
const router = express.Router();

const conversationController = require('./conversation.controller');
const authRequired = require('@/middlewares/authRequired');
const validate = require('@/middlewares/validate');
const { createConversationSchema, getMessagesSchema, createMessageSchema } = require('./conversation.validation');
const { checkConversationAccess } = require('./conversation.middleware');

router.get('/', authRequired, conversationController.getConversations);
router.post('/', validate(createConversationSchema), authRequired, conversationController.createConversation);
router.get('/:id/messages', validate(getMessagesSchema), authRequired, checkConversationAccess, conversationController.getMessages);
router.post('/:id/messages', validate(createMessageSchema), authRequired, checkConversationAccess, conversationController.createMessage);

module.exports = router;
