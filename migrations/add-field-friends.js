'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('friends', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('friends', 'chat_session_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('friends', 'is_friend', {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('friends');
     */
    await queryInterface.removeColumn('friends', 'chat_session_id');
    await queryInterface.removeColumn('friends', 'is_friend');
  },
};
