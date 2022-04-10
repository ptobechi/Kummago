const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./key");

exports.auth = (req, res, next) =>{
    const {accessToken} = req.cookies;
    if(!accessToken){
        return next();
    } 

    const {payload} = verifyJWT(accessToken);

    //for a valid access token
    if(payload){
        //@ts-ignore
        req.user = payload;
        return next()
    }

    return next()



    // try {
    //     const verified = jwt.verify(token, process.env.SECRET);
    //     req.user = verified;
    //     next();
    // } catch (error) {
    //     res.status(400).json("invalid Token")
    // }
}