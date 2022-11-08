'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ! --- USER DETAIL -->>-- USER
      UserDetail.belongsTo(models.User)
      
    }
  }
  UserDetail.init({
    fullName: DataTypes.STRING,
    nickname: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    gridSquare: DataTypes.STRING,
    cqZone: DataTypes.INTEGER,
    ituZone: DataTypes.INTEGER,
    club: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};