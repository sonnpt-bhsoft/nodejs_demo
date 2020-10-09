const express = require('express');
const router = express.Router();
const axios = require('axios');


const courseController = require('../app/controllers/CourseController');
const userController = require('../app/controllers/UserController');





// newsController.index -- function handler
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/actions', courseController.actions)
router.post('/actions1', courseController.actions1)
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);
router.get('/', courseController.index);







module.exports = router;