'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Keranjang, {
      foreignKey: 'Produk_Id'
     })
     this.belongsTo(models.Kategori, {
        foreignKey: 'Kategori_Id',
      })
      this.hasMany(models.Pembeli_Produk_Pesanan, {
      foreignKey: 'Produk_Id'
     })
    }
  }
  Produk.init({
    Nama_Produk: DataTypes.STRING,
    UrlProduk: DataTypes.STRING,
    Jenis_Produk: DataTypes.STRING,
    Deksripsi_Produk: DataTypes.STRING,
    Produk_Terjual: DataTypes.INTEGER,
    Stok_Produk: DataTypes.INTEGER,
    Kategori_Id: DataTypes.INTEGER,
    Harga_Produk: DataTypes.INTEGER,
    isDelete: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Produk',
  });
  return Produk;
};