const express = require('express');
const { addExam,allExam, deleteExam,editExam,viewExam} = require('../controllers/examController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add', addExam);
router.get('/get-all',allExam);
router.delete('/delete/:id',deleteExam);
router.put('/edit/:id',editExam);
router.get('/view/:id',viewExam);

module.exports = router;