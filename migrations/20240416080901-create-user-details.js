'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users"
          },
          key: "id"
        },
      },
      mobileNo: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      noOfPost: {
        type: Sequelize.INTEGER
      },
      bio: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserDetails');
  }
};