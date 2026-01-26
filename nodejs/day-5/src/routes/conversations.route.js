const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware.authenticate);

router.post('/', conversationController.create);
router.get('/', conversationController.list);
router.post('/:id/participants', conversationController.addParticipant);
router.post('/:id/messages', conversationController.sendMessage);
router.get('/:id/messages', conversationController.getMessages);

module.exports = router;
