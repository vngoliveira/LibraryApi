const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'db',
    username: 'root',
    password: 'root',
    database: 'sd',
    dialect: 'mysql',
    port: '3306',
  });

module.exports = sequelize;
