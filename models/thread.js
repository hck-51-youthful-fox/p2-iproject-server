"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Hardware.belongsToMany(models.User, {
      //   through: "Comment",
      //   foreignKey: "HardwareId",
      // });
      Thread.hasMany(models.Comment);
    }
  }
  Thread.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { message: "Topic is required" },
          notEmpty: { message: "Topic is required" },
        },
      },

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { message: "Rating is required" },
          notEmpty: { message: "Rating is required" },
        },
      },
      thread: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { message: "Thread is required" },
          notEmpty: { message: "Thread is required" },
        },
      },
      like: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Thread",
    }
  );
  return Thread;
};
