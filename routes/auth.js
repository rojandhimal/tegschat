// routes/auth.js
const express = require('express');
const router = express.Router();
const { apiAuthController } = require('../controllers/auth.controller');

// Registration
router.post('/register', apiAuthController.apiRegisterUser);

// Authentication (Login)
router.post('/login', apiAuthController.apiLoginUser);

// Authentication (refresh token)
router.post('/refresh-token', apiAuthController.apiRefreshToken);

//Request change password
router.post(
  '/request-change-password',
  apiAuthController.apiRequestResetPassword
);

//Change password
router.post('/change-password', apiAuthController.apiResetPassword);

module.exports = router;
