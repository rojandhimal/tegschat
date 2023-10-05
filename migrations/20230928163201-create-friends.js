'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('friends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_a: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_b: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      block_by: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('friends');
  },
};
