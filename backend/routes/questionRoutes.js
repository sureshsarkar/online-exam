const express = require('express');
const { addQuestion,allQuestion, deleteQuestion,editQuestion,viewQuestion} = require('../controllers/questionController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add',adminAuthMiddleware,addQuestion);
router.get('/get-all',adminAuthMiddleware,allQuestion);
router.delete('/delete/:id',adminAuthMiddleware,deleteQuestion);
router.put('/edit/:id',adminAuthMiddleware,editQuestion);
router.put('/view/:id',adminAuthMiddleware,viewQuestion);

module.exports = router;