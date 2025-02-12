const express = require('express');
const { addQuestion,allQuestion, deleteQuestion,editQuestion,viewQuestion} = require('../controllers/questionController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add',addQuestion);
router.get('/get-all',allQuestion);
router.delete('/delete/:id',deleteQuestion);
router.put('/edit/:id',editQuestion);
router.put('/view/:id',viewQuestion);

module.exports = router;