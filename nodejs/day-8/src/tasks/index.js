const fs = require('fs');
const path = require('path');

const tasks = {};
const tasksPath = __dirname;

fs.readdirSync(tasksPath).forEach((file) => {
    // Only load .task.js files
    if (file.endsWith('.task.js')) {
        const taskName = file.replace('.task.js', '');
        tasks[taskName] = require(path.join(tasksPath, file));
    }
});

module.exports = tasks;
