const User = require("../models/User");
const axios = require('axios');

exports.authUser = async (req, res, next) => {
    if(!req.user){
        return res.status(403).send("Invalid session");
    }

    const {id, email} = req.user;

    const user = await User.findOne({email: email, id: id});
    if(!user) return res.status(400).send("Invalid user");
    
    return next();
}

// exports.loginAuth = async (req, res, next) => {
//     // const id = req.user.id;
//     // const email = req.user.email;
//     const {id, email} = req.user;

//     const user = await User.findOne({email: email, id: id});
//     if(!user) return res.status(400).send("Invalid user");

//     if(user.role === "user" && lastlogin === null){}

// }