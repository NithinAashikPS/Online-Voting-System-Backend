const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const PositionController = require('../controllers/position');

router.get('/', checkAuth, PositionController.read);

router.post('/add', checkAuth, PositionController.add);

router.delete('/delete/:_id', checkAuth, PositionController.delete);

module.exports = router;