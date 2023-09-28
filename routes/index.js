const express = require('express');
const router = express.Router();

const chatRoute = require('./chat.js');
const authRoute = require('./auth.js');

router.use('/auth', authRoute);
router.use('/chat', chatRoute);

module.exports = router;
