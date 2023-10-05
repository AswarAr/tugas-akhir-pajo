'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     await queryInterface.bulkInsert('Produks', 
     [
      {
       Nama_Produk: "Dedak",
      Jenis_Produk: "Pakan",
      Stok_Produk: 200,
      Kategori_Id: 1,
      Harga_Produk: 200000,
      createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
       Nama_Produk: "PCH",
      Jenis_Produk: "Pakan",
      Stok_Produk: 200,
      Kategori_Id: 1,
      Harga_Produk: 200000,
      createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
       Nama_Produk: "DHD",
      Jenis_Produk: "Pakan",
      Stok_Produk: 200,
      Kategori_Id: 2,
      Harga_Produk: 200000,
      createdAt: new Date(),
      updatedAt:new Date(),
      },
      {
       Nama_Produk: "FRT",
      Jenis_Produk: "Pakan",
      Stok_Produk: 200,
      Kategori_Id: 2,
      Harga_Produk: 200000,
      createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
       Nama_Produk: "DFG",
      Jenis_Produk: "Pakan",
      Stok_Produk: 200,
      Kategori_Id: 3,
      Harga_Produk: 200000,
      createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
       Nama_Produk: "DFG",
      Jenis_Produk: "Pakan",
      Stok_Produk: 200,
      Kategori_Id: 3,
      Harga_Produk: 200000,
      createdAt: new Date(),
        updatedAt:new Date(),
      }
    ]);
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
