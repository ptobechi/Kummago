const axios = require('axios');

exports.signupRoutes = (req, res) =>{
    res.render("signup")
}

exports.signinRoutes = (req, res) =>{
    res.render("signin")
}