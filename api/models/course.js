'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {}
  }
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title required"
        },
        notEmpty:{
          msg: "Provide a title"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description required"
        },
        notEmpty:{
          msg: "Provide a description"
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING
    },
    materialsNeeded: {
      type: DataTypes.STRING
    }
  }, { 
    sequelize,
    modelName: 'Course',
  });
  Course.associate = (models) => {
      Course.belongsTo(models.User, {
          as: 'owner',
          foreignKey: {
            fieldName: 'UserId',
            allowNull: false,
          },
      });
    };
  return Course;
};