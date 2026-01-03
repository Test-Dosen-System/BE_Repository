'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ExamResults', 'user_id');
    await queryInterface.addColumn('ExamResults', 'customer_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Customers',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ExamResults', 'customer_id');
    await queryInterface.addColumn('ExamResults', 'user_id', {
      type: Sequelize.INTEGER
    });
  }
};
