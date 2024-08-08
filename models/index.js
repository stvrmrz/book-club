const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');
const Club = require('./club');

// Set up associations
User.hasMany(Club, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Club.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Club,
  sequelize
};
