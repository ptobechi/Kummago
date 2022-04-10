const axios = require('axios');

exports.signupRoutes = (req, res) =>{
    res.render("signup")
}

exports.signinRoutes = (req, res) =>{
    res.render("signin")
}

exports.profileRoutes = (req, res) =>{
    axios.get("http://localhost:3000/api/user/profile" )
    .then(function(response){
         res.render('profile', {user: response.data});    
    })
    .catch(err => {
        res.send(err);
    })
}
