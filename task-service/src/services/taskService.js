const Task = require('../models/taskModel');

exports.getAllTasks = async () => {
    return await Task.findAll();
};

exports.createTask = async (taskData) => {
    return await Task.create(taskData);
};
