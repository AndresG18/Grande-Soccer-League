'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'Team'
      });
      User.hasMany(models.Game, {
        foreignKey: 'homeTeamId',
      });
      User.hasMany(models.Game, {
        foreignKey: 'awayTeamId',
      });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
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
        validate: {
          isIn: [['admin', 'coach', 'player']],
        },
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
      teamId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'SET NULL'
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