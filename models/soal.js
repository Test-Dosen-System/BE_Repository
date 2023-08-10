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
        allowNull: false,
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
      jawaban_e: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jawaban_benar: {
        type: DataTypes.STRING,
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
