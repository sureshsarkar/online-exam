const express = require('express');
const { addCourse,allCourse, deleteCourse,editCourse} = require('../controllers/courseController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/add',adminAuthMiddleware,addCourse);
router.get('/get-all',adminAuthMiddleware,allCourse);
router.delete('/delete/:id',adminAuthMiddleware,deleteCourse);
router.put('/edit/:id',adminAuthMiddleware,editCourse);

module.exports = router;