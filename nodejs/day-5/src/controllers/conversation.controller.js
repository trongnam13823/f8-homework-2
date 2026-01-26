const conversationService = require('../services/conversation.service');

const conversationController = {
    create: async (req, res) => {
        const { name, type, participant_ids } = req.body;
        const created_by = req.user.userId;

        const conversation = await conversationService.createConversation({
            name,
            type,
            created_by,
            participant_ids
        });

        return res.success(conversation, 201);
    },

    list: async (req, res) => {
        const user_id = req.user.userId;
        const conversations = await conversationService.getUserConversations(user_id);
        return res.success(conversations);
    },

    addParticipant: async (req, res) => {
        const { id } = req.params;
        const { user_id } = req.body;

        await conversationService.addParticipant(id, user_id);
        return res.success({ message: 'User added successfully' });
    },

    sendMessage: async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const sender_id = req.user.userId;

        const message = await conversationService.sendMessage({
            conversation_id: id,
            sender_id,
            content
        });

        return res.success(message, 201);
    },

    getMessages: async (req, res) => {
        const { id } = req.params;
        const messages = await conversationService.getMessages(id);
        return res.success(messages);
    }
};

module.exports = conversationController;
