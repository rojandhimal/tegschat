const {
  Friend_request,
  Friends,
  Chat_session,
  Chat_member,
} = require('../models');
const { EFriendRequestStatus } = require('../constant/enum/friendrequest');
const { Op } = require('sequelize');

// NON RENDER CONTROLLER

// API CONTROLLER
const apiGetFriendRequests = async (req, res) => {
  try {
    const friend_requests = await Friend_request.findAll({
      where: {
        user_id: 1,
        status: EFriendRequestStatus.PENDING,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: '', data: friend_requests });
  } catch (error) {
    console.log(
      ' *** Something went wrong while updating message ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

const apiCreateFriendRequest = async (req, res) => {
  try {
    const { user_id } = req.body;
    const friend = await Friends.findOne({
      where: {
        [Op.or]: [
          { user_a: user_id, user_b: 1 },
          { user_a: 1, user_b: user_id },
        ],
        is_friend: 1,
        is_blocked: 0,
      },
    });
    if (friend) {
      console.log(' *** Already a friend ***');
      return res
        .status(400)
        .json({ failure: true, message: 'Already a friend' });
    } else {
      const frinedrequest = await Friend_request.findOne({
        where: {
          [Op.or]: [
            { sender_id: 1, user_id },
            { sender_id: user_id, user_id: 1 },
          ],
          status: EFriendRequestStatus.PENDING,
          is_deleted: 0,
        },
      });
      if (frinedrequest) {
        console.log(' *** Friend request already exist ***');
        return res
          .status(400)
          .json({ failure: true, message: 'Friend request already exist' });
      }
      await Friend_request.create({
        staus: EFriendRequestStatus.PENDING,
        sender_id: 1,
        user_id,
      });
      return res
        .status(201)
        .json({ message: 'Firend request created successfully' });
    }
  } catch (error) {
    console.log(
      ' *** Something went wrong while creating friend request ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

const apiAcceptFriendRequest = async (req, res) => {
  try {
    const { sender_id } = req.body;
    const frinedrequest = await Friend_request.findOne({
      where: {
        user_id: 3,
        sender_id,
        status: EFriendRequestStatus.PENDING,
        is_deleted: 0,
      },
    });
    if (frinedrequest) {
      await frinedrequest.update({ status: EFriendRequestStatus.ACCEPTED });
      let friend = await Friends.findOne({
        [Op.or]: [
          { user_a: sender_id, user_b: 1 },
          { user_a: 1, user_b: sender_id },
        ],
      });
      if (friend) {
        await friend.update({ is_friend: 1 });
      } else {
        friend = await Friends.create({
          user_a: sender_id,
          user_b: 1,
        });
        const chatsession = await Chat_session.create({});
        await friend.update({ chat_session_id: chatsession.id });
        await Chat_member.bulkCreate([
          { chat_session_id: chatsession.id, user_id: sender_id },
          { chat_session_id: chatsession.id, user_id: 1 },
        ]);
      }
      return res.status(200).json({ message: 'Firend request Accepted' });
    } else {
      res
        .status(400)
        .json({ failure: true, message: 'Firend request not found' });
    }
  } catch (error) {
    console.log(
      ' *** Something went wrong while accepting friend request ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

const apiDeclineFriendRequest = async (req, res) => {
  try {
    const { sender_id } = req.body;
    const frinedrequest = await Friend_request.findOne({
      where: {
        user_id: 1,
        sender_id,
        status: EFriendRequestStatus.PENDING,
        is_deleted: 0,
      },
    });
    if (frinedrequest) {
      await frinedrequest.update({ status: EFriendRequestStatus.REJECTED });
      return res.status(200).json({ message: 'Firend request rejected' });
    } else {
      res
        .status(400)
        .json({ failure: true, message: 'Firend request not found' });
    }
  } catch (error) {
    console.log(
      ' *** Something went wrong while rejecting friend request ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

const apiCancelFriendRequest = async (req, res) => {
  try {
    const { sender_id } = req.body;
    const frinedrequest = await Friend_request.findOne({
      where: {
        user_id: 1,
        sender_id,
        status: EFriendRequestStatus.PENDING,
        is_deleted: 0,
      },
    });
    if (frinedrequest) {
      await frinedrequest.update({ status: EFriendRequestStatus.CANCELED });
      return res.status(200).json({ message: 'Firend request canceled' });
    } else {
      res
        .status(400)
        .json({ failure: true, message: 'Firend request not found' });
    }
  } catch (error) {
    console.log(
      ' *** Something went wrong while candelling friend request ***',
      error.message
    );
    res.status(400).json({ failure: true, message: error.message });
  }
};

exports.apiFriendRequestController = {
  apiGetFriendRequests,
  apiCreateFriendRequest,
  apiAcceptFriendRequest,
  apiDeclineFriendRequest,
  apiCancelFriendRequest,
};
