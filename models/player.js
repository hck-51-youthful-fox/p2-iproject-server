"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.hasMany(models.Position);
    }
  }
  Player.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
