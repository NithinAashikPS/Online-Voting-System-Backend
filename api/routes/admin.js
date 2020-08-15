const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const AdminController = require('../controllers/admin');

router.post('/signin', AdminController.admin_signin);

router.patch('/changePassword', AdminController.change_password);

router.patch('/update/:_id', checkAuth, AdminController.update);

module.exports = router;