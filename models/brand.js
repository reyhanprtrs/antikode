'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Outlet);
      Brand.hasMany(models.Product);
    }
  };
  Brand.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string` },
        notNull: { msg: `Brand's name is undefined or null` }
      }
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string` },
        notNull: { msg: `Brand's logo is undefined or null` }
      }
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string` },
        notNull: { msg: `Brand's banner is undefined or null` }
      }
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};