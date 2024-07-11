'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // define association here
      Game.belongsTo(models.Team, {
        foreignKey: 'homeTeamId',
        as: 'HomeTeam'
      });
      Game.belongsTo(models.Team, {
        foreignKey: 'awayTeamId',
        as: 'AwayTeam'
      });
    }
  }
  Game.init(
    {
      homeTeamId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      gameDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      homeTeamScore: {
        type: DataTypes.INTEGER,
      },
      awayTeamScore: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Game',
    }
  );
  return Game;
};