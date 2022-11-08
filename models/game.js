"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init(
    {
      rawgId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Game name can't be empty." },
          notEmpty: { msg: "Game name can't be empty." },
        },
      },
      released: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Game release date can't be empty." },
          notEmpty: { msg: "Game release date can't be empty." },
        },
      },
      gameUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Game URL can't be empty." },
          notEmpty: { msg: "Game URL can't be empty." },
          isUrl: { msg: "Please enter a valid Game URL." },
        },
      },
      imgUrl: DataTypes.TEXT,
      thumbnailUrl: DataTypes.TEXT,
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Game description can't be empty." },
          notEmpty: { msg: "Game description can't be empty." },
        },
      },
      publisher: DataTypes.STRING,
      isFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
