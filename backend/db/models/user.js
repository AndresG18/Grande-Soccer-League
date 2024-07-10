'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Team, {
        foreignKey: 'coach_id',
      });
      User.hasMany(models.Game, {
        foreignKey: 'home_team_id',
      });
      User.hasMany(models.Game, {
        foreignKey: 'away_team_id',
      });
    }
  };

  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      goals: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      assists: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return User;
};