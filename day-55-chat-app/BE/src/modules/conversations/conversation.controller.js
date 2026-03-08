const conversationService = require('./conversation.service');
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
    const { type, users } = req.validated.body;

    const newConversation = await conversationService.createConversation(creatorId, type, users);

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

    const message = await conversationService.createMessage(userId, conversationId, content);

    return response.success(res, message, 'Create message successfully', 201);
});

module.exports = {
    getMessages,
    createConversation,
    getConversations,
    createMessage,
};
