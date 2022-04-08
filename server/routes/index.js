const express = require('express');
const route = express.Router();
const services = require("../renders/render")

/**
 *  @description Root Route
 *  @method GET /
 */
 route.get('/', services.signupRoutes);

 /**
 *  @description Root Route
 *  @method GET /
 */
  route.get('/login', services.signinRoutes);


 module.exports = route