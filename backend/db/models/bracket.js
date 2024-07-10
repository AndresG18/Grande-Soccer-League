'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bracket extends Model {
    static associate(models) {
      // define association here
      Bracket.belongsTo(models.Tournament, {
        foreignKey: 'tournament_id',
      });
      Bracket.belongsTo(models.Game, {
        foreignKey: 'game_id',
      });
    }
  }
  Bracket.init(
    {
      tournament_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Tournaments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      round_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      game_id: {
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