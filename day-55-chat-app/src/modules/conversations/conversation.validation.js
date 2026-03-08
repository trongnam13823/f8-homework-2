const { z } = require('zod');
const { CONVERSATION_TYPE } = require('@/constants/conversation.constants');

const createConversationSchema = z.object({
    body: z.object({
        type: z.enum(Object.values(CONVERSATION_TYPE)),
        users: z.array(z.uuid()),
    }).superRefine((data, ctx) => {
        if (data.type === CONVERSATION_TYPE.DM && data.users.length !== 1) {
            ctx.addIssue({
                code: "custom",
                message: "When type is 'dm', users array must have exactly 1 element",
                path: ["users"],
            });
        }
        if (data.type === CONVERSATION_TYPE.GROUP && data.users.length <= 1) {
            ctx.addIssue({
                code: "custom",
                message: "When type is 'group', users array must have > 1 element",
                path: ["users"],
            });
        }
    })
});

const getMessagesSchema = z.object({
    params: z.object({
        id: z.uuid(),
    }),
    query: z.object({
        limit: z.coerce.number().min(1).max(100).default(20),
        before: z.uuid().optional(),
    }),
});

const createMessageSchema = z.object({
    params: z.object({
        id: z.uuid(),
    }),
    body: z.object({
        content: z.string().trim().min(1),
    }),
});

module.exports = {
    createConversationSchema,
    getMessagesSchema,
    createMessageSchema,
};
