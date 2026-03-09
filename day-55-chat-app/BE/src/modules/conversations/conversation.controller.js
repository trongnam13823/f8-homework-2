const conversationService = require('./conversation.service');
const pusher = require('@/lib/pusher');
const catchAsync = require('@/utils/catchAsync');
const response = require('@/utils/response');

const getMessages = catchAsync(async (req, res) => {
    const { id } = req.validated.params;
    const { limit, before } = req.validated.query;

    const result = await conversationService.getMessages(id, limit, before);

    return response.success(res, result, 'Get messages successfully');
});

const createConversation = catchAsync(async (req, res) => {
    const creatorId = req.user.sub;
    const { type, users, name } = req.validated.body;

    const newConversation = await conversationService.createConversation(creatorId, type, users, name);

    return response.success(res, newConversation, 'Create conversation successfully', 201);
});

const getConversations = catchAsync(async (req, res) => {
    const userId = req.user.sub;

    const conversations = await conversationService.getConversations(userId);

    return response.success(res, conversations, 'Get conversations successfully');
});

const createMessage = catchAsync(async (req, res) => {
    const userId = req.user.sub;
    const { id: conversationId } = req.validated.params;
    const { content } = req.validated.body;

    const { message, memberIds } = await conversationService.createMessage(userId, conversationId, content);

    // Trigger Pusher event for the specific chat
    pusher.trigger(`chat.${conversationId}`, 'message.new', message);

    // Trigger Pusher event for each member's private channel (for sidebar/notifs)
    memberIds.forEach((id) => {
        pusher.trigger(`user.${id}`, 'conversation.updated', {
            conversationId,
            lastMessage: message,
        });
    });

    return response.success(res, message, 'Create message successfully', 201);
});

module.exports = {
    getMessages,
    createConversation,
    getConversations,
    createMessage,
};
