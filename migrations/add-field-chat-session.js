'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('Chat_sessions', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Chat_sessions', 'type', {
      type: Sequelize.ENUM('PRIVATE', 'PUBLIC', 'CLOSED'),
      allowNull: false,
    });
    await queryInterface.addColumn('Chat_sessions', 'is_blocked', {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Chat_sessions', 'blocked_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Chat_sessions');
     */
    await queryInterface.removeColumn('Chat_sessions', 'type');
    await queryInterface.removeColumn('Chat_sessions', 'is_blocked');
    await queryInterface.removeColumn('Chat_sessions', 'blocked_by');
  },
};
