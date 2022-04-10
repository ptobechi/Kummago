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
        await user.save();

        return res.status(200).send({
            message: "Registration Successful",
            user: user._id,
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

    //create and assign user a accessToken
    const accessToken = signJWT({id: user._id, email: user.email}, "1d")
    
    //store token in cookies
    res.cookie("accessToken", accessToken,{
        maxAge: 3000000,
        httpOnly: true,
    });

    //send response to webpage
    return res.send(verifyJWT(accessToken).payload)

}

exports.getUser = async (req, res) =>{
    if(req.id){
        const id = req.id;
        console.log(id)
        console.log(id)
        console.log("paooakaksjnsh")
        User.findById(id)
        .then(Users => {
            if(!Users){
                res.status(404).send({message: "User not found"})
            }else{
                res.send(Users);
            }
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "An Error occured retriving products"})
        })


    }else{
        User.find()
        .then(Users => {
            res.send(Users);
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "An Error occured retriving products"})
        })
    }
}

//get active session from cookies 
exports.getActiveSession = (req, res) =>{
    //@ts ignore
    return res.send(req.user)
    // return console.log(req.user)
}

//user logout/signout
exports.signout = (req, res) => {
    // res.clearCookie("accessToken")
    // return res.json({
    //     message: "User signout successful"
    // })
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });

    // res.cookie("refreshToken", "", {
    //     maxAge: 0,
    //     httpOnly: true,
    // });

    // const session = invalidateSession(req.user.sessionId)
    return res.send({success: true})
}