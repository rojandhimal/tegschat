const bcrypt = require('bcrypt');
const { Chat_message } = require('../models');

// NON RENDER CONTROLLER

// API CONTROLLER
const apiGetSessionChatMessages = async (req, res) => {
  try {
    const { session_id } = req.params;
    const chats = await Chat_message.findAll({
      where: {
        chat_session_id: session_id,
      },
    });
    return res.status(200).json({ success: true, message: '', data: chats });
  } catch (error) {
    console.log(
      ' *** Something went wrong while updating message ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

const apiCreateChatMessage = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { message } = req.body;

    const chat_message = await Chat_message.create({
      chat_session_id: session_id,
      message,
      sender_id: 1,
    });
    return res.status(201).json({ message: 'Chat created successfully' });
  } catch (error) {
    console.log(
      ' *** Something went wrong while updating message ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

const apiUpdateChatMessage = async (req, res) => {
  try {
    const { session_id, id } = req.params;
    const { message } = req.body;

    const chat_message = await Chat_message.findOne({
      where: {
        chat_session_id: session_id,
        id,
        sender_id: 1,
      },
    });
    if (chat_message) {
      await chat_message.update({ message });
      return res.status(200).json({ message: 'Chat updated successfully' });
    } else {
      res.status(400).json({ failure: true, message: 'Chat not found' });
    }
  } catch (error) {
    console.log(
      ' *** Something went wrong while updating message ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

const apiDeleteChatMessage = async (req, res) => {
  try {
    const { session_id, id } = req.params;
    const chat_message = await Chat_message.findOne({
      where: {
        chat_session_id: session_id,
        id,
        sender_id: 1,
      },
    });
    if (chat_message) {
      await chat_message.update({ is_deleted: 1 });
      return res.status(200).json({ message: 'Chat deleted successfully' });
    } else {
      res.status(400).json({ failure: true, message: 'Chat not found' });
    }
  } catch (error) {
    console.log(
      ' *** Something went wrong while updating message ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

exports.apiChatMessageController = {
  apiGetSessionChatMessages,
  apiCreateChatMessage,
  apiUpdateChatMessage,
  apiDeleteChatMessage,
};
