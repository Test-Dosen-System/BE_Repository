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
      Soal.belongsTo(models.Groupsoal, {
        foreignKey: "id_soal_panjang",
        as: "soalpanjang",
      });

      Soal.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Soal.init(
    {
      soal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_soal_panjang: {
        type: DataTypes.INTEGER,
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
