'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Despesa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Despesa.init({
    funcionarioId: DataTypes.INTEGER,
    data: DataTypes.DATE,
    descricao: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    arquivoPdf: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Despesa',
  });
  return Despesa;
};