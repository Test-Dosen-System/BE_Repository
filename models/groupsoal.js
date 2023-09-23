"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groupsoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Groupsoal.hasMany(models.Soal, {
      //   foreignKey: "id_soal_panjang",
      //   as: "soalpanjang",
      // });
    }
  }
  Groupsoal.init(
    {
      soal_panjang: DataTypes.STRING,
      files: DataTypes.STRING,
      files2: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Groupsoal",
    }
  );
  return Groupsoal;
};
