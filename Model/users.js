const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Users = new Schema ({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
})

const UserModel = mongoose.model('users',Users);
module.exports = UserModel;