'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('Friend_requests', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Friend_requests', 'is_deleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Friend_requests');
     */
    await queryInterface.removeColumn('Friend_requests', 'is_deleted');
  },
};
