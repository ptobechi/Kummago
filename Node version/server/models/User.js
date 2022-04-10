const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{type:String, required:true, min:6, max:231},
    lastname:{type:String, min:6, max:231},
    email:{type:String, required:true, unique:true, min:6, max:255},
    password:{type:String, required: true, min: 6, max: 1024},
    role:{type:String, default: "user"},
    phone:{type:String},
    address:{type:String, min:6},
    state:{type:String, min:6},
    country:{type:String},
    picture:{type:String},
    password:{type:String, required: true, min: 6, max: 1024},
    status:{type: Number},
    lastlogin:{type:Date, default: Date.now},
    date:{type:Date, default: Date.now},
});

userSchema.statics.login = function login(id, callback){
    return this.findByIdAndUpdate(id, {'$set' : {'lastlogin' : Date.now()} }, {new : true}, callback);
}

module.exports = mongoose.model("User", userSchema);