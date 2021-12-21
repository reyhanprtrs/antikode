const brand = require('express').Router();
const { Brand } = require('../controllers');

brand.get('/', Brand.getBrand);
brand.post('/', Brand.createBrand);
brand.get('/getAllBrandName', Brand.getAllBrandName);
brand.get('/:id', Brand.getBrandById);
brand.put('/:id', Brand.updateBrand);
brand.delete('/:id', Brand.deleteBrand);

module.exports = brand;