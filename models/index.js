const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');

// Export models and sequelize instance
module.exports = {
  User,
  sequelize
};
