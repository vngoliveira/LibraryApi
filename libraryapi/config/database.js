const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    database: 'libraryapi',
    dialect: 'mysql',
    port: '3306',
  });

module.exports = sequelize;
