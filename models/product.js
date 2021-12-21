'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand);
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string`},
        notNull: { msg: `Product's name is undefined or null` }
      }
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: `Product's picture is required` }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string`},
        notNull: { msg: `Product's price is undefined or null` }
      }
    },
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};