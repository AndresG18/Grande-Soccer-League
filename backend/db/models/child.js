'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    static associate(models) {
      // define association here
      Child.belongsTo(models.User, {
        foreignKey: 'coachId',
        as: 'Coach'
      });
    }
  }

  Child.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coachId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Child',
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );

  return Child;
};