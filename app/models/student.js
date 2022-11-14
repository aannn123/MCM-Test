'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const db = require('../models')
  const studentPlan = db.studyPlans
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Student.hasMany(models.StudyPlanCard,{foreignKey:'studentId'})
    }
  }
  Student.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    college: DataTypes.STRING,
    level: DataTypes.STRING,
    nim: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};