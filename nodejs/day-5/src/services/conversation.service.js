const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const ApiError = require('../utils/ApiError');

const conversationService = {
    createConversation: async ({ name, type, created_by, participant_ids }) => {
        const conversationId = await Conversation.create({ name, type, created_by });

        // Add creator as participant
        await Conversation.addParticipant(conversationId, created_by);

        // Add other participants
        if (participant_ids && Array.isArray(participant_ids)) {
            for (const userId of participant_ids) {
                if (userId !== created_by) {
                    await Conversation.addParticipant(conversationId, userId);
                }
            }
        }

        return await Conversation.findById(conversationId);
    },

    getUserConversations: async (user_id) => {
        const conversations = await Conversation.getUserConversations(user_id);
        return conversations;
    },

    addParticipant: async (conversation_id, user_id) => {
        const conversation = await Conversation.findById(conversation_id);
        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        if (conversation.type !== 'group') {
            throw new ApiError(400, 'Can only add participants to group conversations');
        }

        return await Conversation.addParticipant(conversation_id, user_id);
    },

    sendMessage: async ({ conversation_id, sender_id, content }) => {
        const messageId = await Message.create({ conversation_id, sender_id, content });
        return { id: messageId, conversation_id, sender_id, content, created_at: new Date() };
    },

    getMessages: async (conversation_id) => {
        return await Message.getConversationMessages(conversation_id);
    }
};

module.exports = conversationService;
