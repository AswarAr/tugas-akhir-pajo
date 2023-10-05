'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     this.hasMany(models.Produk, {
      foreignKey: 'Kategori_Id'
     })
    }
  }
  Kategori.init({
    Nama_Kategori: DataTypes.STRING,
    UrlGambar: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Kategori',
  });
  return Kategori;
};