'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    static associate(models) {
      // define association here
      Tournament.hasMany(models.Bracket, {
        foreignKey: 'tournamentId',
      });
    }
  }
  Tournament.init(
    {
      tournamentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tournament',
    }
  );
  return Tournament;
};