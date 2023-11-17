const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    name:{type:"string",require:"true"},
    email:{type:"string",require:"true",unique:"true"},
    password:{type:"string",require:"true"}
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel