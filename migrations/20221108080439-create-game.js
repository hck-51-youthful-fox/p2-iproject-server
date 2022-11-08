"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rawgId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      released: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gameUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imgUrl: {
        type: Sequelize.TEXT,
      },
      thumbnailUrl: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Games");
  },
};
