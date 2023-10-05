'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     await queryInterface.bulkInsert('Kategoris',
     [
      {
        Nama_Kategori: 'Pakan Ayam',
        createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
        Nama_Kategori: 'Pakan Sapi',
        createdAt: new Date(),
        updatedAt:new Date(),
      },
      {
        Nama_Kategori: 'Pakan Kerbau',
        createdAt: new Date(),
        updatedAt:new Date(),
      }
      ],
      );
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
