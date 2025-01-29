const express = require('express');
const { getUsers, addUser,loginUser } = require('../controllers/userController');
const router = express.Router();


router.get('/all', getUsers);
router.post('/add', addUser);
router.post('/login', loginUser);

module.exports = router;