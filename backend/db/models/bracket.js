'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bracket extends Model {
    static associate(models) {
      // define association here
      Bracket.belongsTo(models.Tournament, {
        foreignKey: 'tournamentId',
      });
      Bracket.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
    }
  }
  Bracket.init(
    {
      tournamentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Tournaments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      roundNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gameId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Games',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Bracket',
    }
  );
  return Bracket;
};