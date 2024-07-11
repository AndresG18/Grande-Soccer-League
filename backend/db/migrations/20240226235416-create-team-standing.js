'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TeamStandings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      gamesPlayed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      losses: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      draws: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "TeamStandings";
    await queryInterface.dropTable(options);
  }
};