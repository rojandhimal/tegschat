'use strict';

const { EFriendRequestStatus } = require('../constant/enum/friendrequest');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Friend_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          EFriendRequestStatus.PENDING,
          EFriendRequestStatus.ACCEPTED,
          EFriendRequestStatus.REJECTED,
          EFriendRequestStatus.CANCELED
        ),
        defaultValue: EFriendRequestStatus.PENDING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Friend_requests');
  },
};
