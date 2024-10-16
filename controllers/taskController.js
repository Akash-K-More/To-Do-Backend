const Task = require('../models/Task');

exports.addTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const userId = req.user.id; // Assume user ID is attached to the request

  try {
    const taskId = await Task.create(userId, title, description, priority, dueDate);
    res.status(201).json({ message: 'Task created', taskId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.getByUser(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};
