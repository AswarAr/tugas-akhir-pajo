'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pembayaran.init({
    Nama: DataTypes.STRING,
    UrlGambar: DataTypes.STRING,
    Nama_Pemilik: DataTypes.STRING,
    Nomor_Tujuan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pembayaran',
  });
  return Pembayaran;
};