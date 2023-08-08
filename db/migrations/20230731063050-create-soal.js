"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("soals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      soal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jawaban_a: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jawaban_b: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jawaban_c: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jawaban_d: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jawaban_e: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jawaban_benar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kategori_soal: {
        type: Sequelize.ENUM,
        values: ["TOEP", "TKDA"],
        allowNull: false,
      },
      jenis_soal: {
        type: Sequelize.ENUM,
        values: ["TEKS", "GAMBAR", "AUDIO"],
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("soals");
  },
};
