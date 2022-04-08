const User = require("../models/User");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const {signJWT, verifyJWT} = require("../middleware/key");

//User registration/signup controller
exports.signup = async (req, res) => {
    //validate user data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //check if user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const saveduser = await user.save();
        return res.status(200).send({
            message: "Registration Successful",
            user: user._id,
            name: user.name
        })
    } catch (err) {
        return res.status(400).send(err)
    }

}

//user login/signin controller
exports.signin = async (req, res) => {
    const {email, password} = req.body

    //check if user already exists
    const user = await User.findOne({email: email});
    if(!user) return res.status(400).send("Email not found");

    //Authennticate user 
    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(400).json("Invalid password");

    //create a token
    // const token = jwt.sign({_id: user._id}, process.env.SECRET)
    const accessToken = signJWT({email: user.email, name: `${user.firstname} ${user.lastname}`}, "1h")
    
    //store token in cookies
    // res.cookie("token", token, {expire: new Date() + 1})
    // res.header("token", token, {expire: new Date() + 1});
    res.cookie("accessToken", accessToken,{
        maxAge: 3000000,
        httpOnly: true,
    });

    //send response to webpage
    // const {_id, name, userEmail} = user
    // return res.json({
    //     token,
    // })
    return res.send(verifyJWT(accessToken).payload)

}

//user logout/signout
exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "User signout successful"
    })
}