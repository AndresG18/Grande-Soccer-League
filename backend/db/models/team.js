'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      // define association here
      Team.belongsTo(models.User, {
        foreignKey: 'coach_id',
      });
      Team.hasMany(models.Game, {
        foreignKey: 'home_team_id',
      });
      Team.hasMany(models.Game, {
        foreignKey: 'away_team_id',
      });
      Team.hasMany(models.TeamStanding, {
        foreignKey: 'team_id',
      });
    }
  }
  Team.init(
    {
      team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coach_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      home_arena: {
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