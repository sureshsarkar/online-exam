const express = require('express');
const { addCourse,allCourse, deleteCourse,editCourse} = require('../controllers/courseController');

const router = express.Router();

router.post('/add',addCourse);
router.get('/get-all',allCourse);
router.delete('/delete/:id',deleteCourse);
router.put('/edit/:id',editCourse);

module.exports = router;