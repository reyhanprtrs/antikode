const outlet = require('express').Router();
const { Outlet } = require('../controllers');

outlet.get('/', Outlet.findAll);
outlet.post('/', Outlet.createOutlet);
outlet.put('/:id', Outlet.updateOutlet);
outlet.delete('/:id', Outlet.deleteOutlet);

module.exports = outlet;