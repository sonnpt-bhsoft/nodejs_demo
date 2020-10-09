const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');
const userController = require('../app/controllers/UserController');


// newsController.index -- function handler

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);



module.exports = router;