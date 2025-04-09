const pool = require('../db/pool');

async function allTasks() {
  return pool.query('SELECT * FROM tasks');
}

async function createTask(title, description, dueDate) {
  const query = 'INSERT into tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *;';
  try {
    const result = await pool.query(query, [title, description, dueDate]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating task', error.message);
    throw error;
  }
}

async function tasksByTitle(title) {
  const query = 'SELECT * FROM tasks WHERE title ILIKE $1';
  const values = [`%${title}%`];
  const { rows } = await pool.query(query, values);
  return rows;
}

async function deleteTask(id) {
  const query = 'DELETE from tasks WHERE id = $1 RETURNING *';
  try {
    const { rowCount } = await pool.query(query, [id]);
    if (rowCount === 0) {
      return { error: 'task not found' };
    }
    return { message: 'task successfully deleted' };
  } catch (error) {
    console.error('failed to delete task ', error.message);
    throw error;
  }
}

async function updateTaskStatus(id, status) {
  const query = 'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *';
  try {
    const { rowCount, rows } = await pool.query(query, [status, id]);
    if (rowCount === 0) {
      return { error: 'task not found' };
    }
    return rows[0];
  } catch (error) {
    console.error('error updating task status', error.message);
    throw error;
  }
}

module.exports = {
  allTasks, tasksByTitle, createTask, deleteTask, updateTaskStatus,
};
