'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserReview)
      User.hasOne(models.UserDetail)
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull : false,
      unique : { msg : "Username is already taken"},
      validate: {
        notNull :{msg:'Username is required'},
        notEmpty : {msg:'Username is required'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique : { msg : "Email is already in use"},
      validate: {
        isEmail : {msg: 'Email must be in email format'},
        notNull : {msg:'Email is required'},
        notEmpty : {msg:'Email is required'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : {msg:'Password is required'},
        notEmpty : {msg:'Password is required'},
        len: {
          args : [6,15],
          msg : `Password must be between 6 to 15 characters long`
        }
      }
    },
    verified: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};