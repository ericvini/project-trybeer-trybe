const express = require('express');

const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.post('/login', LoginController.login);

module.exports = router;
