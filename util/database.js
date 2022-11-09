const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'vidmate', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
