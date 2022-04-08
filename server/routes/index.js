const express = require('express');
const route = express.Router();
const services = require("renders/render")

/**
 *  @description Root Route
 *  @method GET /
 */
 route.get('/', services.homeRoutes);


 module.exports = route