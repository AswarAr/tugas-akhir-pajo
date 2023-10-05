'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembeli extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Keranjang, {
      foreignKey: 'Pembeli_Id'
     })
     this.hasMany(models.Pembeli_Produk_Pesanan, {
      foreignKey: 'Pembeli_Id'
     })
     this.hasMany(models.Pesanan, {
      foreignKey: 'Pembeli_Id'
     })
    }
  }
  Pembeli.init({
    Nama: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Alamat: DataTypes.STRING,
    Nomor_HP: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pembeli',
  });
  return Pembeli;
};