const pool = require('../config/database');

class User {
  static async create(username, email, passwordHash) {
    const [result] = await pool.query(
      'INSERT INTO Users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, Date.now()]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = User;
