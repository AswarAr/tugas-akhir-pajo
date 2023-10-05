'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembeli_Produk_Pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Produk, {
        foreignKey: 'Produk_Id',
      })
      this.belongsTo(models.Pembeli, {
        foreignKey: 'Pembeli_Id',
      })
      this.belongsTo(models.Pesanan, {
        foreignKey: 'Pesanan_Id',
      })
    }
  }
  Pembeli_Produk_Pesanan.init({
    Produk_Id: DataTypes.INTEGER,
    Pembeli_Id: DataTypes.INTEGER,
    Pesanan_Id: DataTypes.INTEGER,
    Jumlah: DataTypes.INTEGER,
    Total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pembeli_Produk_Pesanan',
  });
  return Pembeli_Produk_Pesanan;
};