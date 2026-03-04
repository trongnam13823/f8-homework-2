const TodoModel = require('@/models/todo.model');
const ApiError = require('@/utils/ApiError');

class TodoService {
    static async getAll() {
        return await TodoModel.getAll();
    }

    static async getById(id) {
        const todo = await TodoModel.getById(id);
        if (!todo) {
            throw new ApiError('Todo not found', 404);
        }
        return todo;
    }

    static async create(data) {
        if (!data.title) {
            throw new ApiError('Title is required', 400);
        }
        return await TodoModel.create(data);
    }

    static async update(id, data) {
        const updatedTodo = await TodoModel.update(id, data);
        if (!updatedTodo) {
            throw new ApiError('Todo not found', 404);
        }
        return updatedTodo;
    }

    static async delete(id) {
        const deletedTodo = await TodoModel.delete(id);
        if (!deletedTodo) {
            throw new ApiError('Todo not found', 404);
        }
        return deletedTodo;
    }
}

module.exports = TodoService;
