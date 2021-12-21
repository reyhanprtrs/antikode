'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Outlet.belongsTo(models.Brand);
    }
  };
  Outlet.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string`},
        notNull: { msg: `Outlet's name is undefined or null` }
      }
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string`}
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string`},
        notNull: { msg: `Outlet's address is undefined or null` }
      }
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string`},
        notNull: { msg: `Outlet's longitude is undefined or null` }
      }
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Can't be filled with empty string`},
        notNull: { msg: `Outlet's latitude is undefined or null` }
      }
    },
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Outlet',
  });
  return Outlet;
};