const { z } = require('zod');
const { idParam } = require('./common.validation');

const createTodo = z.object({
    body: z.object({
        title: z.string().min(1),
        description: z.string().optional(),
    }),
});

const getTodoById = z.object({
    params: idParam,
});

const updateTodo = z.object({
    params: idParam,
    body: z.object({
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
    }),
});

const deleteTodo = z.object({
    params: idParam,
});

module.exports = {
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
};
