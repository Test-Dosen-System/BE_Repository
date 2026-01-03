'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customer, { foreignKey: "customer_id" });
    }
  }
  ExamResult.init({
    customer_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    score: DataTypes.INTEGER,
    correct_count: DataTypes.INTEGER,
    total_questions: DataTypes.INTEGER,
    duration_spent: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExamResult',
    // Force reload comment
  });
  return ExamResult;
};