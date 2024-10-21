const express = require('express');
const router = express.Router();
const { addTask, getTasks, updateTask } = require('../controllers/taskController');
const validateUser = require('../middlewares/validateUser'); // Auth middleware

router.post('/add-task', validateUser, addTask);
router.get('/get-tasks/:userId', validateUser, getTasks);
router.put('/update-task/:id', validateUser, updateTask)

module.exports = router;
