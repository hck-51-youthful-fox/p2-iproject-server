"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      ShowId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      showName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      showImgUrl: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      showSummary: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      imgName: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rents");
  },
};
