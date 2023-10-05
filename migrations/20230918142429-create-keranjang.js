'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Keranjangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Produk_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Produks',
          key: 'id',
        },
      },
      Pembeli_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pembelis',
          key: 'id'
        },
      },
      Jumlah: {
        type: Sequelize.INTEGER
      },
      Total_Harga: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Keranjangs');
  }
};