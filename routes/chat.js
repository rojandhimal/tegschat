// routes/auth.js
const express = require('express');
const {
  apiChatMessageController,
} = require('../controllers/chatmessage.controller');
const router = express.Router();

router.get(
  '/private/message/:session_id',
  apiChatMessageController.apiGetSessionChatMessages
);

router.post(
  '/private/message/:session_id',
  apiChatMessageController.apiCreateChatMessage
);

router.post(
  '/private/message/:session_id/update/:id',
  apiChatMessageController.apiUpdateChatMessage
);

router.post(
  '/private/message/:session_id/delete/:id',
  apiChatMessageController.apiDeleteChatMessage
);

module.exports = router;
