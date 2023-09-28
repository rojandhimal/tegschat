const express = require('express');
const router = express.Router();

const chatRoute = require('./chat.js');
const authRoute = require('./auth.js');
const friendRequestRoute = require('./friendrequest.js');

router.use('/auth', authRoute);
router.use('/friendrequest', friendRequestRoute);
router.use('/chat', chatRoute);

module.exports = router;
