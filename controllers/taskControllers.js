const db = require('../query/taskQueries');

const getAllTasks = async (req, res, next) => {
  try {
    const result = await db.allTasks();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const postCreateTask = async (req, res, next) => {
  const { title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: 'title and due date is required' });
  }
  try {
    const result = await db.createTask(title, description, dueDate);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

const getTasksByTitle = async (req, res, next) => {
  const { title } = req.query;

  try {
    const result = await db.tasksByTitle(title);
    if (!result.length) {
      return res.status(404).json({ error: 'No tasks found with that title' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const handleDeleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.deleteTask(id);

    if (result.error) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const putUpdateTask = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await db.updateTaskStatus(id, status);
    if (result.error) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const putEditTasks = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;
  try {
    const result = await db.editTask(id, title, description, dueDate);
    if (result.error) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllTasks, postCreateTask, getTasksByTitle, handleDeleteTask, putUpdateTask, putEditTasks,
};
