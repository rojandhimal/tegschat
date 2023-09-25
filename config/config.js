// config.js
const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect, // Change this to your database dialect if necessary (e.g., postgres)
  }
);

module.exports = sequelize;
