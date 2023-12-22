'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Pembeli_Produk_Pesanan, {
      foreignKey: 'Pesanan_Id'
     })
     this.belongsTo(models.Pembeli, {
        foreignKey: 'Pembeli_Id',
      })
    }
  }
  Pesanan.init({
    Pembeli_Id: DataTypes.INTEGER,
    Bukti_Pembayaran: DataTypes.STRING,
    Status: DataTypes.STRING,
    Jarak_Tujuan: DataTypes.INTEGER,
    Ongkir: DataTypes.INTEGER,
    Waktu_Pembayaran: DataTypes.DATE,
    Akhir_Pembayaran: DataTypes.DATE,
    Total: DataTypes.INTEGER,
    Tanggal: DataTypes.TIME(6),
  }, {
    sequelize,
    modelName: 'Pesanan',
  });
  return Pesanan;
};