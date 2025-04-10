"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "image", {
      type: Sequelize.STRING,
      allowNull: true, // или false, если хочешь обязать указывать картинку
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "image");
  },
};
