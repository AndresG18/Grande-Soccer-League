'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamStanding extends Model {
    static associate(models) {
      // define association here
      TeamStanding.belongsTo(models.Team, {
        foreignKey: 'team_id',
      });
    }
  }
  TeamStanding.init(
    {
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      games_played: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      losses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      draws: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'TeamStanding',
    }
  );
  return TeamStanding;
};