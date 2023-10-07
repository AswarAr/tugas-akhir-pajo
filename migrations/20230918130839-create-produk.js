'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nama_Produk: {
        type: Sequelize.STRING
      },
      UrlProduk: {
        type: Sequelize.STRING
      },
      Jenis_Produk: {
        type: Sequelize.STRING
      },
      Deksripsi_Produk: {
        type: Sequelize.TEXT
      },
      Stok_Produk: {
        type: Sequelize.INTEGER
      },
      Produk_Terjual: {
        type: Sequelize.INTEGER
      },
      Kategori_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Kategoris',
          key: 'id',
        },
      },
      Harga_Produk: {
        type: Sequelize.INTEGER
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Produks');
  }
};