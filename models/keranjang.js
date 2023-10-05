'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keranjang extends Model {
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
    }
  }
  Keranjang.init({
    Produk_Id: DataTypes.INTEGER,
    Pembeli_Id: DataTypes.INTEGER,
    Jumlah: DataTypes.INTEGER,
    Total_Harga: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Keranjang',
  });
  return Keranjang;
};