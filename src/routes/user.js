const express = require('express');
const router = express.Router();




const userController = require('../app/controllers/UserController');




router.post('/register', userController.create);
router.get('/register', userController.register);
router.get('/login', userController.login);
router.post('/login', userController.postlogin);
router.get('/', userController.isAuthenticated, userController.index);



module.exports = router;