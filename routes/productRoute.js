const product = require('express').Router();
const { Product } = require('../controllers');

product.get('/', Product.findAll);
product.post('/', Product.createProduct);
product.put('/:id', Product.updateProduct);
product.delete('/:id', Product.deleteProduct);

module.exports = product;