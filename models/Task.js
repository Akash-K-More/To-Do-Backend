const pool = require('../config/database');

class Task {
  static async create(userId, title, description, priority, dueDate) {
    const [result] = await pool.query(
      'INSERT INTO Tasks (user_id, title, description, priority, due_date) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description, priority, dueDate]
    );
    return result.insertId;
  }

  static async getByUser(userId) {
    const [rows] = await pool.query('SELECT * FROM Tasks WHERE user_id = ?', [userId]);
    return rows;
  }

  static async update(id, updates) {
    const { title, description, priority, status, dueDate } = updates;
    await pool.query(
      'UPDATE Tasks SET title = ?, description = ?, priority = ?, status = ?, due_date = ? WHERE id = ?',
      [title, description, priority, status, dueDate, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM Tasks WHERE id = ?', [id]);
  }
}

module.exports = Task;
