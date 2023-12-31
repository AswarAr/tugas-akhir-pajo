'use strict';

const { DATE, DATEONLY } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pesanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Pembeli_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pembelis',
          key: 'id'
        },
      },
      Bukti_Pembayaran: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING
      },
      Total: {
        type: Sequelize.INTEGER
      },
      Tanggal: {
        type: Sequelize.DATEONLY,
        defaultValue: DATEONLY
      },
      Waktu_Pembayaran: {
        type: Sequelize.DATE,
      },
      Akhir_Pembayaran: {
        type: Sequelize.DATE
      },
      Jarak_Tujuan: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Ongkir: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Pesanans');
  }
};