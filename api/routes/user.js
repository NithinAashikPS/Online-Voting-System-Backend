const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup);

router.post('/signin', UserController.user_signin);

router.patch('/changePassword', UserController.change_password);

router.patch('/update/:_id', checkAuth, UserController.update);

module.exports = router;