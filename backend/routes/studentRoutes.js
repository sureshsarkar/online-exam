const express = require('express');
const { addStudent, getAll, loginStudent, logoutStudent, editStudent,deleteStudent,profile } = require('../controllers/studentController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const router = express.Router();

router.post('/add', addStudent);
router.get('/profile', profile);
router.get('/get-all',adminAuthMiddleware, getAll);
router.post('/login', loginStudent);
router.get('/logout', logoutStudent);
router.put('/edit/:id',adminAuthMiddleware, editStudent); // Fixed route parameter syntax
router.delete('/delete/:id',adminAuthMiddleware, deleteStudent); // Fixed route parameter syntax

module.exports = router;
