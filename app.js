if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');
const app = express();

app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  routes,
  errorHandler
]);

module.exports = app;