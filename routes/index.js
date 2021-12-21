const routes = require('express').Router();
const brandRoute = require('./brandRoute');
const outletRoute = require('./outletRoute');
const productRoute = require('./productRoute');

routes.use('/brand', brandRoute);
routes.use('/outlet', outletRoute);
routes.use('/product', productRoute);

module.exports = routes;