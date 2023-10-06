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
      id_soal_panjang: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      jawaban_benar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skor: {
        type: Sequelize.INTEGER,
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
      part_soal: {
        type: Sequelize.ENUM,
        values: [
          "RESPONSES",
          "CONVERSATION",
          "LONGER CONVERSATION",
          "MINI TALKS",
          "READING SECTION",
          "ANALOGY",
          "LOGICAL REASONING",
          "ANALITICAL REASONING",
          "ARITMETIC",
          "NUMBER SERIES",
          "WORD PORBLEM",
          "FIGUR ANALYSIS AND SYNTHESIS",
          "SPATIAL REASONING",
        ],
        allowNull: false,
      },
      durasi: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      files: {
        type: Sequelize.TEXT,
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
