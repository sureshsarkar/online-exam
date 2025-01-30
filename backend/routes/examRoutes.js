const express = require('express');
const { addExam,allExam, deleteExam,editExam} = require('../controllers/examController');

const router = express.Router();

router.post('/add',addExam);
router.get('/get-all',allExam);
router.delete('/delete/:id',deleteExam);
router.put('/edit/:id',editExam);

module.exports = router;