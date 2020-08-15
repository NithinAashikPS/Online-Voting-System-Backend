const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const CandidateController = require('../controllers/candidate');

router.get('/', checkAuth, CandidateController.read);

router.post('/add/:position/:name', checkAuth, CandidateController.add);

router.delete('/delete/:_id', checkAuth, CandidateController.delete);

module.exports = router;