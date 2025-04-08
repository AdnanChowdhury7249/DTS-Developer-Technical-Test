const db = require('../query/taskQueries');

const getAllTasks = async (req, res, next) => {
  try {
    const result = await db.allTasks();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks };
