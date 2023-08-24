"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Readme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Readme.init(
    {
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      files1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      files2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      files3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Readme",
    }
  );
  return Readme;
};
