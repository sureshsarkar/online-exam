const express = require('express');
const { addSubject,allSubject, deleteSubject,editSubject} = require('../controllers/subjectController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add',adminAuthMiddleware,addSubject);
router.get('/get-all',adminAuthMiddleware,allSubject);
router.delete('/delete/:id',adminAuthMiddleware,deleteSubject);
router.put('/edit/:id',adminAuthMiddleware,editSubject);

module.exports = router;