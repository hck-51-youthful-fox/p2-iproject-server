"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hardware extends Model {
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
      Hardware.hasMany(models.Comment);
    }
  }
  Hardware.init(
    {
      name: DataTypes.STRING,
      merk: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hardware",
    }
  );
  return Hardware;
};
