const express = require('express');
const router = express.Router();
const validate = require('@/middlewares/validate');
const { registerSchema, loginSchema } = require('./auth.validation');
const authController = require('./auth.controller');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
