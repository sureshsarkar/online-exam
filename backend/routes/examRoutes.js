const express = require('express');
const { addExam,allExam, deleteExam,editExam} = require('../controllers/examController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add',adminAuthMiddleware, addExam);
router.get('/get-all',adminAuthMiddleware,allExam);
router.delete('/delete/:id',adminAuthMiddleware,deleteExam);
router.put('/edit/:id',adminAuthMiddleware,editExam);

module.exports = router;