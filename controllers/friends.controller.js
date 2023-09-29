const {
  Friend_request,
  Friends,
  Chat_session,
  Chat_member,
} = require('../models');
const { Op } = require('sequelize');

const DEFAULT_LIMIT = 10; // Get the limit from the request query, default to 10

// NON RENDER CONTROLLER

// API CONTROLLER

// get all users
const apiGetALlFriends = async (req, res) => {
  req.user = { id: 1 };
  try {
    const limit = req.query.limit || DEFAULT_LIMIT;
    const page = req.query.page || 1; // Get the page number from the request query, default to 1
    const offset = (page - 1) * limit; // Calculate the offset to determine which records to retrieve
    const friends = await Friends.findAndCountAll({
      include: [
        {
          association: 'primery_user',
          where: {
            id: { [Op.ne]: req.user.id }, // Exclude the current user's ID
          },
          required: false,
        },
        {
          association: 'secondary_user',
          where: {
            id: { [Op.ne]: req.user.id }, // Exclude the current user's ID
          },
          required: false,
        },
      ],
      where: {
        [Op.or]: [{ user_a: req.user.id }, { user_b: req.user.id }],
        is_blocked: 0,
        is_friend: 1,
      },
      limit,
      offset: offset,
    });
    const totalDocuments = friends.count;
    const currentPage = page;
    const totalPages = Math.ceil(totalDocuments / limit);
    const data = {
      friends: friends.rows, // The array of friend records for the current page
      totalDocuments: totalDocuments,
      currentPage: currentPage,
      totalPages: totalPages,
      limit,
      offset,
    };

    return res.status(200).json({ success: true, message: '', data });
  } catch (error) {
    console.log(
      ' *** Something went wrong while fetching friends ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

// get all blocked users
const apiGetALlBlockedFriends = async (req, res) => {
  req.user = { id: 1 };
  try {
    const limit = req.query.limit || DEFAULT_LIMIT;
    const page = req.query.page || 1; // Get the page number from the request query, default to 1
    const offset = (page - 1) * limit; // Calculate the offset to determine which records to retrieve
    const friends = await Friends.findAndCountAll({
      include: [
        {
          association: 'primery_user',
          where: {
            id: { [Op.ne]: req.user.id }, // Exclude the current user's ID
          },
          required: false,
        },
        {
          association: 'secondary_user',
          where: {
            id: { [Op.ne]: req.user.id }, // Exclude the current user's ID
          },
          required: false,
        },
      ],
      where: {
        [Op.or]: [{ user_a: req.user.id }, { user_b: req.user.id }],
        is_blocked: 1,
        block_by: req.user.id,
      },
      limit,
      offset: offset,
    });
    const totalDocuments = friends.count;
    const currentPage = page;
    const totalPages = Math.ceil(totalDocuments / limit);
    const data = {
      friends: friends.rows, // The array of friend records for the current page
      totalDocuments: totalDocuments,
      currentPage: currentPage,
      totalPages: totalPages,
      limit,
      offset,
    };

    return res.status(200).json({ success: true, message: '', data });
  } catch (error) {
    console.log(
      ' *** Something went wrong while fetching friends ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

exports.apiFriendsController = {
  apiGetALlFriends,
  apiGetALlBlockedFriends,
};
