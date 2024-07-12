'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'Users', schema: options.schema },
      'teamId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Teams',
            schema: options.schema
          },
          key: 'id'
        },
        onDelete: 'SET NULL',
      },
      options
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      { tableName: 'Users', schema: options.schema },
      'teamId',
      options
    );
  }
};