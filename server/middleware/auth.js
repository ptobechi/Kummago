const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.header("token");
    if(!token) return res.status(400).json("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json("invalid Token")
    }
}