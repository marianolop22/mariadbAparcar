var express = require('express');
var app = express();
var ProvinceController = require('../controllers/province.controller');


app.get('/', ProvinceController.getProvince);

module.exports = app;