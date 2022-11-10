"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Library.belongsTo(models.Game, { foreignKey: "GameId" });
    }
  }
  Library.init(
    {
      GameId: { type: DataTypes.INTEGER, allowNull: false },
      UserId: { type: DataTypes.INTEGER, allowNull: false },
      status: DataTypes.STRING,
      favorite: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Library",
    }
  );
  return Library;
};
