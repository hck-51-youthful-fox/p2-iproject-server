'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/index');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Video, {
      through: models.Like,
      foreignKey: 'userId'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email field cannot be empty'
        },
        notEmpty: {
          msg: 'Email field cannot be empty'
        },
        isEmail: {
          msg: 'Please type in valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password field cannot be empty'
        },
        notEmpty: {
          msg: 'Password field cannot be empty'
        },
        len: {
          args: [5],
          msg: 'Password min length is 5'
        }
      }
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    avatar: {
      type: DataTypes.TEXT,
      defaultValue: "https://st3.depositphotos.com/6672868/13801/v/600/depositphotos_138013506-stock-illustration-user-profile-group.jpg"
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashPassword(user.password)
  })
  return User;
};