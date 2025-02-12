const express = require('express');
const { getUsers, addUser,loginUser,logoutUser } = require('../controllers/UserController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const router = express.Router();


router.get('/all', getUsers);
router.post('/add', addUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;