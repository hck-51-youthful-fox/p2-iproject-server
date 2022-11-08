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
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email has already been taken." },
        validate: {
          notNull: { msg: "Please enter your email." },
          notEmpty: { msg: "Please enter your email." },
          isEmail: { msg: "Please enter a valid email." },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter your password." },
          notEmpty: { msg: "Please enter your password." },
        },
      },
      status: DataTypes.STRING,
      username: DataTypes.STRING,
      profileImgUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  //* Hooks bcryptjs
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });

  return User;
};
