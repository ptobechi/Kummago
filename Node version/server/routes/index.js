const express = require('express');
const { getActiveSession } = require('../controller/User');
const { auth } = require('../middleware/auth');
const route = express.Router();
const services = require("../renders/render");


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


 /**
 *  @description Root Route
 *  @method GET /
 */
  route.get('/user', auth, services.profileRoutes);


 module.exports = route