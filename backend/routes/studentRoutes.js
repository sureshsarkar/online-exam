const express = require('express');
const { addStudent, getAll, loginStudent, logoutStudent, editStudent,deleteStudent } = require('../controllers/studentController');
const router = express.Router();

router.post('/add', addStudent);
router.get('/get-all', getAll);
router.post('/login', loginStudent);
router.get('/logout', logoutStudent);
router.put('/edit/:id', editStudent); // Fixed route parameter syntax
router.delete('/delete/:id', deleteStudent); // Fixed route parameter syntax

module.exports = router;
