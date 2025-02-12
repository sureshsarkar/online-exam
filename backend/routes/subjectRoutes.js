const express = require('express');
const { addSubject,allSubject, deleteSubject,editSubject} = require('../controllers/subjectController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add',addSubject);
router.get('/get-all',allSubject);
router.delete('/delete/:id',deleteSubject);
router.put('/edit/:id',editSubject);

module.exports = router;