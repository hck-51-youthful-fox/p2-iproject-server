"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyNote.belongsTo(models.User, { foreignKey: "userId" });
      MyNote.belongsTo(models.Note, { foreignKey: "noteId" });
    }
  }
  MyNote.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "userId is required",
          },
          notEmpty: {
            msg: "userId is required",
          },
        },
      },
      noteId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "noteId is required",
          },
          notEmpty: {
            msg: "noteId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "MyNote",
    }
  );
  return MyNote;
};
