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
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: `Username already exist`,
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: `Username is required`,
          },
          notEmpty: {
            msg: `Username is required`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: `Email already exist`,
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: `Email is required`,
          },
          notEmpty: {
            msg: `Email is required`,
          },
          isEmail: {
            msg: `Must use Email Format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password is required`,
          },
          notEmpty: {
            msg: `Password is required`,
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Phone number is required`,
          },
          notEmpty: {
            msg: `Phone number is required`,
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Address is required`,
          },
          notEmpty: {
            msg: `Address is required`,
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
    instance.password = hashPassword(instance.password);
  });
  return User;
};
