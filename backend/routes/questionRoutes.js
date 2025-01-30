const express = require('express');
const { addQuestion,allQuestion, deleteQuestion,editQuestion} = require('../controllers/questionController');

const router = express.Router();

router.post('/add',addQuestion);
router.get('/get-all',allQuestion);
router.delete('/delete/:id',deleteQuestion);
router.put('/edit/:id',editQuestion);

module.exports = router;