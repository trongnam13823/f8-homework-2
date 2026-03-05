const TodoService = require('@/services/todo.service');

class TodoController {
    static async getAllTodos(req, res) {
        const todos = await TodoService.getAll();
        return res.success(todos);
    }

    static async getTodoById(req, res) {
        const { id } = req.params;
        const todo = await TodoService.getById(id);
        return res.success(todo);
    }

    static async createTodo(req, res) {
        const newTodo = await TodoService.create(req.body);
        return res.success(newTodo, 'Todo created successfully', 201);
    }

    static async updateTodo(req, res) {
        const { id } = req.params;
        const updatedTodo = await TodoService.update(id, req.body);
        return res.success(updatedTodo, 'Todo updated successfully');
    }

    static async deleteTodo(req, res) {
        const { id } = req.params;
        await TodoService.delete(id);
        return res.success(null, 'Todo deleted successfully');
    }
}

module.exports = TodoController;
