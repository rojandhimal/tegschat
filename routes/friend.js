const express = require('express');
const router = express.Router();

const friendRequestRoute = require('./friendrequest.js');
const {
  apiFriendsController,
} = require('../controllers/friends.controller.js');

//friend request routes
router.use('/request', friendRequestRoute);

// get all friend list
router.get('/all', apiFriendsController.apiGetALlFriends);
// get all blocked list
router.get('/blocked', apiFriendsController.apiGetALlBlockedFriends);

module.exports = router;
