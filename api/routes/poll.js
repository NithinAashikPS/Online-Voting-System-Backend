const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const PollController = require('../controllers/poll');

router.get('/:_id', checkAuth, PollController.read);

router.patch('/vote/:_id/:voter', checkAuth, PollController.vote);

module.exports = router;