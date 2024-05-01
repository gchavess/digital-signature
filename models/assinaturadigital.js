'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssinaturaDigital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssinaturaDigital.init({
    relatorioId: DataTypes.INTEGER,
    gerenteId: DataTypes.INTEGER,
    data: DataTypes.DATE,
    assinatura: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AssinaturaDigital',
  });
  return AssinaturaDigital;
};