const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');
const Club = require('./club');
const Book = require('./book');
const Meeting = require('./meeting');

// Define associations
User.hasMany(Club, {
  foreignKey: 'userId',
  as: 'clubs',
  onDelete: 'CASCADE'
});

Club.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner'
});

Club.hasMany(Book, {
  foreignKey: 'clubId',
  as: 'books'
});

Book.belongsTo(Club, {
  foreignKey: 'clubId',
  as: 'club'
});

// Export models and sequelize instance
module.exports = {
  User,
  Club,
  Book,
  Meeting,
  sequelize
};
