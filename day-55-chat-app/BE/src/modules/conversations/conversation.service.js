const { CONVERSATION_TYPE } = require('@/constants/conversation.constants');
const prisma = require('@/lib/prisma');
const ApiError = require('@/utils/ApiError');

const createMessage = async (userId, conversationId, content) => {
    // 1. Transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
        // Tạo message mới
        const message = await tx.message.create({
            data: {
                content,
                senderId: userId,
                conversationId,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });

        // Cập nhật lastMessageId và updatedAt của Cuộc hội thoại
        const conversation = await tx.conversation.update({
            where: { id: conversationId },
            data: {
                lastMessageId: message.id,
            },
            include: {
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
        });

        return {
            message,
            memberIds: conversation.members.map((m) => m.userId),
        };
    });

    return result;
};

const getMessages = async (conversationId, limit = 20, before) => {
    // 1. Check if conversation exists
    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
    });

    if (!conversation) {
        throw new ApiError(404, 'Conversation not found');
    }

    // 2. Fetch messages with cursor-based pagination
    const messages = await prisma.message.findMany({
        where: {
            conversationId,
        },
        take: limit + 1, // Lấy dư 1 để check xem còn tin nhắn cũ hơn không (hasMore)
        ...(before ? {
            cursor: { id: before },
            skip: 1, // Bỏ qua bản thân tin nhắn làm mốc
        } : {}),
        orderBy: {
            createdAt: 'desc', // Lấy từ mới về cũ để dễ phân trang
        },
        include: {
            sender: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
        },
    });

    const hasMore = messages.length > limit;
    if (hasMore) {
        messages.pop(); // Loại bỏ phần tử "dư" check hasMore
    }

    // Đảo ngược lại mảng để messages trả về theo đúng thứ tự thời gian tăng dần
    messages.reverse();

    return {
        messages,
        hasMore,
    };
};

const createConversation = async (creatorId, type, users, name) => {
    // 1. Kiểm tra trường hợp DM (chat 1-1)
    if (type === CONVERSATION_TYPE.DM) {
        const otherUserId = users[0];
        // Kiểm tra xem 2 người đã có cuộc hội thoại chưa
        const existingDM = await prisma.conversation.findFirst({
            where: {
                type: CONVERSATION_TYPE.DM,
                AND: [
                    { members: { some: { userId: creatorId } } },
                    { members: { some: { userId: otherUserId } } },
                ],
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                    take: 2,
                },
            },
        });

        // Nếu đã có thì có thể trả về luôn conversation đó
        if (existingDM) {
            return existingDM;
        }
    }

    // 2. Chuẩn bị mảng thành viên tham gia hội thoại (bao gồm cả creator)
    // Dùng set để lọc các userId bị trùng lặp
    const uniqueUserIds = [...new Set([creatorId, ...users])];
    const members = uniqueUserIds.map((id) => ({
        userId: id,
    }));

    // 3. Tạo conversation
    const newConversation = await prisma.conversation.create({
        data: {
            type,
            createdBy: creatorId,
            name,
            members: {
                create: members,
            },
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                take: 2,
            },
        },
    });

    return newConversation;
};

const getConversations = async (userId) => {
    const conversations = await prisma.conversation.findMany({
        where: {
            members: {
                some: {
                    userId,
                },
            },
            OR: [
                {
                    type: CONVERSATION_TYPE.DM,
                    lastMessageId: { not: null },
                },
                {
                    type: CONVERSATION_TYPE.GROUP,
                },
            ]
        },
        include: {
            lastMessage: {
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                take: 2,
            },
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });

    return conversations;
};



module.exports = {
    getMessages,
    createConversation,
    getConversations,
    createMessage,
};
