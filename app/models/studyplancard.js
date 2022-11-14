'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudyPlanCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // StudyPlanCard.belongsTo(models.Student, { foreignKey: "studentId", as: "student" })
    }
  }
  StudyPlanCard.init({
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'StudyPlanCard',
  });
  return StudyPlanCard;
};