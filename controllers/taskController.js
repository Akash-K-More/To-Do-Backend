const db = require('../config/database');
const Task = require('../models/Task');

exports.addTask = async (req, res) => {
  const {userId, title, description, priority, dueDate } = req.body;

  const createdAt = new Date();
  const updatedAt = new Date();

  const query = `
        INSERT INTO Tasks (user_id, title, description, priority, due_date, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)
    `;

  try {
    const [result] = await db.query(query, [userId, title, description, priority, dueDate, createdAt, updatedAt]);
    const taskId = result.insertId; // Get the ID of the newly created task
    res.status(201).json({ message: 'Task created', taskId });
  } catch (error) {
    console.error('Error creating task:', error);
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