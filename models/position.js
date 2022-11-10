"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Position.belongsTo(models.Player);
      Position.belongsTo(models.User);
    }
  }
  Position.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PlayerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Position",
    }
  );
  return Position;
};
