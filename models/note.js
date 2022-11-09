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
      Note.belongsTo(models.User, {foreignKey: "userId"})
      Note.belongsTo(models.Category, {foreignKey: "categoryId"})

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
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "userId is required",
          },
          notNull: {
            msg: "userId is required",
          },
        },
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "categoryId is required",
          },
          notNull: {
            msg: "categoryId is required",
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
