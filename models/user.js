"use strict";
const { Model } = require("sequelize");
const { passHass } = require("../helpers");
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
        unique: {
          msg: `E-mail already registered`,
        },
        validate: {
          notNull: {
            msg: `E-mail cannot be empty`,
          },
          notEmpty: {
            msg: `E-mail cannot be empty`,
          },
          isEmail: {
            msg: `E-mail must be in E-mail format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password cannot be empty`,
          },
          notEmpty: {
            msg: `Password cannot be empty`,
          },
          len: {
            args: [5],
            msg: `Password min length is 5`,
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Username cannot be empty`,
          },
          notEmpty: {
            msg: `Username cannot be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    instance.password = passHass(instance.password);
  });
  return User;
};
