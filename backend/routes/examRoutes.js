const express = require('express');
const { addExam,allExam, deleteExam,editExam,viewExam} = require('../controllers/examController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add',adminAuthMiddleware, addExam);
router.get('/get-all',adminAuthMiddleware,allExam);
router.delete('/delete/:id',adminAuthMiddleware,deleteExam);
router.put('/edit/:id',adminAuthMiddleware,editExam);
router.get('/view/:id',adminAuthMiddleware,viewExam);

module.exports = router;