// routes/auth.js
const express = require('express');
const { apiFriendRequestController } = require('../controllers/friendrequest');
const router = express.Router();

router.get('/all', apiFriendRequestController.apiGetFriendRequests);
router.post('/send', apiFriendRequestController.apiCreateFriendRequest);
router.post('/accept', apiFriendRequestController.apiAcceptFriendRequest);
router.post('/decline', apiFriendRequestController.apiDeclineFriendRequest);
router.post('/cancel', apiFriendRequestController.apiCancelFriendRequest);

module.exports = router;
