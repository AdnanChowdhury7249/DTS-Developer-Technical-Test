const express = require('express');
const {
  getAllTasks,
  postCreateTask,
  getTasksByTitle,
  handleDeleteTask,
  putUpdateTask,
  putEditTasks,
} = require('../controllers/taskControllers');

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', postCreateTask);
router.get('/search/title', getTasksByTitle);
router.delete('/:id', handleDeleteTask);
router.put('/:id', putUpdateTask);
router.put('/edit/:id', putEditTasks);

module.exports = router;
