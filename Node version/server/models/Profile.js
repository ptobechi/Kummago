// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     userid:{type:String},
//     firstname:{type:String, required:true, min:6, max:231},
//     lastname:{type:String, min:6, max:231},
//     email:{type:String, required:true, unique:true, min:6, max:255},
//     phone:{type:String},
//     address:{type:String, min:6},
//     state:{type:String, min:6},
//     country:{type:String},
//     picture:{type:String},
//     password:{type:String, required: true, min: 6, max: 1024},
//     status:{type: Number},
//     date:{type:Date, default: Date.now},
// });

// module.exports = mongoose.model("Profile", userSchema);