const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Club extends Model {}

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'club'
  }
);

Club.associate = (models) => {
  Club.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'owner'
  });

  Club.hasMany(models.Book, {
    foreignKey: 'clubId',
    as: 'books'
  });
};

module.exports = Club;
