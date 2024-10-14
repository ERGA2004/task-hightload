const { getAllTasks, createTask } = require('../services/taskService');

exports.getTasks = async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const task = await createTask(req.body);
    res.status(201).json(task);
};
