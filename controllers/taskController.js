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
  const userId = req.params.userId; // Get user ID from query parameters
  // console.log(userId);
  const query = `
      SELECT * FROM Tasks
      WHERE user_id = ?
  `;

  try {
      const [tasks] = await db.query(query, [userId]);
      res.status(200).json({ tasks: tasks, msg: "Data retrived sucessfull" });
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Error fetching tasks', error });
  }
};


// taskController.js
exports.updateTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const taskId = req.params.id; // Get task ID from request parameters

  const query = `
      UPDATE tasks
      SET title = ?, description = ?, priority = ?, due_date = ?, updated_at = NOW()
      WHERE id = ? AND user_id = ?
  `;

  try {
      const userId = req.body.userId; // Get user ID from request body
      const [result] = await db.query(query, [title, description, priority, dueDate, taskId, userId]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Task not found or not authorized' });
      }

      res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Error updating task', error });
  }
};