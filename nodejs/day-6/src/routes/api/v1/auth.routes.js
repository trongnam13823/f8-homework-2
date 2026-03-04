const express = require('express');
const AuthController = require('@/controllers/auth.controller');
const catchAsync = require('@/middlewares/catchAsync');
const authRequired = require('@/middlewares/auth.middleware');
const validate = require('@/middlewares/validate.middleware');
const authValidation = require('@/validations/auth.validation');

const router = express.Router();

router.post('/register', validate(authValidation.register), catchAsync(AuthController.register));
router.post('/login', validate(authValidation.login), catchAsync(AuthController.login));
router.post('/refresh-token', validate(authValidation.refresh), catchAsync(AuthController.refresh));
router.post('/logout', authRequired, catchAsync(AuthController.logout));

module.exports = router;

