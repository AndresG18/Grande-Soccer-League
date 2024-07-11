'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamStanding extends Model {
    static associate(models) {
      // define association here
      TeamStanding.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'Team'
      });
    }
  }
  TeamStanding.init(
    {
      teamId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      gamesPlayed: {
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