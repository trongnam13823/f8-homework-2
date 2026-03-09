const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authRequired = require('@/middlewares/authRequired');
const validate = require('@/middlewares/validate');
const { searchUserSchema } = require('./user.validation');

router.get('/search', authRequired, validate(searchUserSchema), userController.searchUser);

module.exports = router;
