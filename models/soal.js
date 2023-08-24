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
        type: DataTypes.STRING,
        allowNull: true,
      },
      jawaban_a: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jawaban_b: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jawaban_c: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jawaban_d: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jawaban_benar: {
        type: DataTypes.STRING,
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
        values: ["RESPONSES", "CONVERSATION", "MINI TALKS", "READING SECTION"],
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

  // Add a beforeUpdate hook
  Soal.addHook("beforeUpdate", async (soal, options) => {
    const changedAnswers = ["jawaban_a", "jawaban_b", "jawaban_c", "jawaban_d"];

    if (changedAnswers.includes(soal.changed("jawaban_benar"))) {
      const changedAnswerColumn = soal.changed("jawaban_benar");
      soal.jawaban_benar = soal[changedAnswerColumn];
    }
  });

  return Soal;
};
