"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.hasMany(models.MyNote, { foreignKey: "noteId" });
    }
  }
  Note.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Desccription is required",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "Date is required",
          },
          notNull: {
            msg: "Date is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
