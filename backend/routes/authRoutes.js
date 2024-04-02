const express = require('express');
const { signup, login , Index } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', Index)
module.exports = router;
