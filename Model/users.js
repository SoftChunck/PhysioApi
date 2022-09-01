const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Users = new Schema ({
    heading:{
        type:String,
        required:true
    },
    paragraph:{
        type:String,
        required:true
    },
    imagefile:{
        type:String
    },
    htmlfile:{
        type:String,
        required:true
    },
    designfile:{
        type:Object,
        required:true
    },
})

const UserModel = mongoose.model('users',Users);
module.exports = UserModel;