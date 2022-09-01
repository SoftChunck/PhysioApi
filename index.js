const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const UserModel = require('./Model/users')
const BlogsModel = require('./Model/blogs')
const fs = require('fs');

let img ;
let signinUser = '';
let currentid = 0;
let updateblogid = ''
let ids = [];



const dbURI = 'mongodb+srv://usama:0000@cluster0.x1phja1.mongodb.net/Physiofix?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result)=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log(err);
    })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/',(req,res)=>{
    res.send('Hello Connected')
})
// app.get('/allblogs',(req,res)=>{
//     BlogsModel.find().limit(4)
//     .then(result => {
//         res.status(200).json(result)
//     })
// })
app.get('/allblogs',(req,res)=>{
    BlogsModel.find({},{id:1})
            .then( result =>{
                ids = []
                result.map(t => {
                    ids.push(t.id)
                })
                currentid = -1;
                res.status(200).json({maxblogs:ids.length})
            })
            
         
})
app.get('/allblogs/next',(req,res)=>{
    if(currentid < ids.length)
    {
        currentid += 1        
        BlogsModel.findById(ids[currentid])
        .then( blog => {

            // fs.writeFile('blog.html',blog.htmlfile,(err)=>{
            //     if(err)
            //     {
            //         console.log(err)
            //     }else{
            //         console.log('File Written Succesfully')
            //     }
            // });
            res.status(200).json(blog)
        }) 
    } 
    else{
        res.status(200).send()
    }
})
app.get('/allblogs/next',(req,res)=>{
    if(currentid < ids.length)
    {
        currentid += 1        
        BlogsModel.findById(ids[currentid])
        .then( blog => {
            res.status(200).json(blog)
        }) 
    } 
    else{
        res.status(200).send()
    }
})
app.get('/blogbyid',(req,res)=>{
    BlogsModel.findById(updateblogid)
        .then( blog => {
            res.status(200).json(blog)
        }) 
})
app.post('/blogbyid',(req,res)=>{    
    updateblogid = req.body.id;
    res.status(200).send()
})
app.get('/signin',(req,res)=>{
    if(signinUser[0].email == 'abc@gmail.com')
    {            
        res.status(200).json({admin:'true',username:signinUser[0].username})
    }
    else{
        console.log(signinUser)
        res.status(200).json({admin:'false',username:signinUser[0].username})
    }
    if(signinUser.length == 0)
    {
        res.status(200).json({admin:'false'})
    }
})

app.post('/signin',(req,res)=>{
    console.log(req.body)
    UserModel.find({email: req.body.email , password : req.body.password})
    .then(result => {        
        if(result.length == 0)
        {
            res.status(400).send()
        }
        else{  
            signinUser = result;       
            res.status(200).send()
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(200).send(err);
    })
})
app.post('/signup',(req,res)=>{
    UserModel.find({email:req.body.email})
    .then(result => {        
        console.log(result)
        if(result.length == 0)
        {
            console.log(req.body)
            let user = new UserModel();
            user.username = req.body.username
            user.password = req.body.password
            user.email = req.body.email
            // user.usertype = req.body.username
            UserModel.insertMany(user)
            .then(result => {        
                res.status(200).send('Account Created')
            })
            .catch( error => {
                console.log('Hello')
                res.status(400).send('Some Error')
            })
        }
        else{
            console.log('Account Already Exist With this Email')            
            res.status(200).send('Account Already Exist With this Email')
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(200).send(err);
    })
   
})

app.post('/submit',(req,res)=>{
    console.log(req.body)  
    let blog = new BlogsModel()
    blog.heading = req.body.heading
    blog.paragraph = req.body.paragraph
    blog.imagefile = req.body.imagefile
    blog.htmlfile = req.body.htmlFile
    blog.designfile = req.body.designFile

    BlogsModel.insertMany(blog)
            .then(result => {        
                res.status(200).send('Blog Created')
            })
            .catch( error => {
                console.log(error)
                res.status(400).send('Some Error')
            })
})
app.post('/submitUpdate',(req,res)=>{
    console.log(req.body)  
    let blog = new BlogsModel()
    blog.heading = req.body.heading
    blog.paragraph = req.body.paragraph
    blog.imagefile = req.body.imagefile
    blog.videofile = req.body.videofile

    BlogsModel.findByIdAndUpdate(req.body.id,{"heading":blog.heading,"paragraph":blog.paragraph,"imagefile":blog.imagefile,"videofile":blog.videofile})
            .then(result => {        
                res.status(200).send('Blog Created')
            })
            .catch( error => {
                console.log(error)
                res.status(400).send('Some Error')
            })
})
app.post('/deleteblog',(req,res)=>{
    BlogsModel.findByIdAndDelete(req.body.id)
    .then(result => {
        res.status(200).send();
    })
    .catch( error => {
        console.log(error)
        res.status(400).send('Some Error')
    })

})

app.listen(process.env.PORT || 5000)