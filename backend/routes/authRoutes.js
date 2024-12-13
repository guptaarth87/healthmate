const express = require('express');
const { signup, login , Index, getAllUsers,deleteUser } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', Index)
router.delete('/deleteuser/:id', deleteUser);
router.get('/getusers', getAllUsers);
module.exports = router;
