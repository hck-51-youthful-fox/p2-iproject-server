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
      User.hasMany(models.Post);
      User.hasMany(models.Comment);
      // User.belongsToMany(models.Post, {
      //   through: models.Comment,
      // });
      // // User.hasMany(models.Comment);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username already Taken!" },
        validate: {
          notEmpty: { msg: "Username cannot be Null" },
          notNull: { msg: "Username cannot Empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already Taken!" },
        validate: {
          notEmpty: { msg: "Email cannot be Null" },
          notNull: { msg: "Email cannot Empty" },
          isEmail: { msg: "Must Be Email Format!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password cannot be Null" },
          notNull: { msg: "Password cannot Empty" },
        },
      },
      isPremium: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
    instance.isPremium = false;
  });
  return User;
};
