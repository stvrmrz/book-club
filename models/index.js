const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');
const Book = require('./book');

// Define associations
User.hasMany(Book, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'userId'
});

// Export models and sequelize instance
module.exports = {
  User,
  Book,
  sequelize
};
