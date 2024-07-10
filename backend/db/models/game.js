'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // define association here
      Game.belongsTo(models.Team, {
        foreignKey: 'home_team_id',
      });
      Game.belongsTo(models.Team, {
        foreignKey: 'away_team_id',
      });
    }
  }
  Game.init(
    {
      home_team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      away_team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      game_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      home_team_score: {
        type: DataTypes.INTEGER,
      },
      away_team_score: {
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