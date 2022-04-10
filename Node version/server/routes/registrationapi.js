const {check} = require("express-validator");
const { signup, signin, getUser } = require("../controller/User");
const router = require("express").Router();


//http://localhost:3000/api/user/signup
router.post("/api/signup", [
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be at least 6 characterts").isLength({min: 6}),
], signup);

//http://localhost:3000/api/user/signin
router.post("/api/signin", [
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be at least 6 characterts").isLength({min: 6}),
], signin)


//api fetch user data
router.get("/api/user/profile", getUser)

module.exports = router;