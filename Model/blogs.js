const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Blogs = new Schema ({
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

const BlogsModel = mongoose.model('blogs',Blogs);
module.exports = BlogsModel;