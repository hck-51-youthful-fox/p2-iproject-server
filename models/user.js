"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.RentReview);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username has been taken!" },
        validate: {
          notNull: { msg: "username is required!" },
          notEmpty: { msg: "username is required!" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email has been taken!" },
        validate: {
          notNull: { msg: "email is required!" },
          notEmpty: { msg: "email is required!" },
          isEmail: { msg: "Must be in email format!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required!" },
          notEmpty: { msg: "password is required!" },
          len: {
            args: [[5, 20]],
            msg: "Password characters must be between 5 to 20!",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => (user.password = hashPassword(user.password)));
  return User;
};
