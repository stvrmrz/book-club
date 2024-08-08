const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');
const Club = require('./club');

User.hasMany(Club, {
  foreignKey: 'userId'
});
Club.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Club,
  sequelize
};
