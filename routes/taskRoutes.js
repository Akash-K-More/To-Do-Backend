const express = require('express');
const router = express.Router();
const { addTask, getTasks } = require('../controllers/taskController');
const validateUser = require('../middlewares/validateUser'); // Auth middleware

router.post('/', validateUser, addTask);
router.get('/', validateUser, getTasks);

module.exports = router;
