"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Carts", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        id: "id",
      },
    });
    await queryInterface.addColumn("Carts", "ProductId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        id: "id",
      },
    });
    await queryInterface.addColumn("Invoices", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        id: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeColumn('UserId')
    await queryInterface.removeColumn("Carts");
    await queryInterface.removeColumn("Invoices");
  },
};
