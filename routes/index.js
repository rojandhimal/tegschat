const express = require('express');
const router = express.Router();

const chatRoute = require('./chat.js');
const authRoute = require('./auth.js');
const friendRoute = require('./friend.js');
const authenticateApi = require('../middleware/authentication.js');

router.use('/auth', authRoute);
router.use('/friend', authenticateApi, friendRoute);
router.use('/chat', authenticateApi, chatRoute);

module.exports = router;
