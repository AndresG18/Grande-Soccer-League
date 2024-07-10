'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        first_name: "Demo",
        last_name: "User",
        email: 'demo@user.io',
        phone: '123-456-7890',
        hashedPassword: bcrypt.hashSync('newpassword1'),
        type: 'admin',
        goals: 0,
        assists: 0,
        approved: true
      }, {
        first_name: "Daniel",
        last_name: "Garcia",
        email: 'demo1@user.io',
        phone: '123-456-7891',
        hashedPassword: bcrypt.hashSync('newpassword2'),
        type: 'admin',
        goals: 0,
        assists: 0,
        approved: true
      }, {
        first_name: "Andres",
        last_name: "Garcia",
        email: 'demo2@user.io',
        phone: '123-456-7892',
        hashedPassword: bcrypt.hashSync('password'),
        type: 'admin',
        goals: 0,
        assists: 0,
        approved: true
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: ['demo@user.io', 'demo1@user.io', 'demo2@user.io']
      }
    });
  }
};