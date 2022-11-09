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
      name: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      thread: DataTypes.STRING,
      like: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Thread",
    }
  );
  return Thread;
};
