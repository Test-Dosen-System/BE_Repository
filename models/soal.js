"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Soal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Soal.init(
    {
      soal: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      jawaban_a: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jawaban_b: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jawaban_c: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jawaban_d: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jawaban_benar: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      skor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kategori_soal: {
        type: DataTypes.ENUM,
        values: ["TOEP", "TKDA"],
        allowNull: false,
      },
      jenis_soal: {
        type: DataTypes.ENUM,
        values: ["TEKS", "GAMBAR", "AUDIO"],
        allowNull: false,
      },
      part_soal: {
        type: DataTypes.ENUM,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      files: {
        type: DataTypes.TEXT,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Soal",
    }
  );
  return Soal;
};
