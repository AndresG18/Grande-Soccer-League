'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      // define association here
      Team.belongsTo(models.User, {
        foreignKey: 'coachId',
      });
      Team.hasMany(models.Game, {
        foreignKey: 'homeTeamId',
      });
      Team.hasMany(models.Game, {
        foreignKey: 'awayTeamId',
      });
      Team.hasMany(models.TeamStanding, {
        foreignKey: 'teamId',
      });
      Team.hasMany(models.User, {
        foreignKey: 'teamId',
        as: 'Players'
      });
    }
  }
  Team.init(
    {
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coachId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      homeArena: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Team',
    }
  );
  return Team;
};