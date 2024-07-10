'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    static associate(models) {
      // define association here
      Tournament.hasMany(models.Bracket, {
        foreignKey: 'tournament_id',
      });
    }
  }
  Tournament.init(
    {
      tournament_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
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