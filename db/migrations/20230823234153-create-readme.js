"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Readmes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      files1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      files2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      files3: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Readmes");
  },
};
