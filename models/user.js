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
      // User.belongsToMany(models.Hardware, {
      //   through: "Comment",
      //   foreignKey: "UserId",
      // });
      User.hasMany(models.Comment);
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { message: "Username is required" },
          notEmpty: { message: "Username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { message: "Email must be unique" },
        validate: {
          notNull: { message: "Email is required" },
          notEmpty: { message: "Email is required" },
          isEmail: { message: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { message: "Password is required" },
          notEmpty: { message: "Password is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
