const express = require('express');
const {
  getAllTasks,
} = require('../controllers/taskControllers');

const router = express.Router();

router.get('/', getAllTasks);

module.exports = router;
