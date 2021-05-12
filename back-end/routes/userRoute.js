const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.put('/profile', UserController.updateUserName);

module.exports = router;
