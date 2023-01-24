const express = require("express")
const cors= require("cors")
const fileUpload = require("express-fileupload");
const bodyparser = require("body-parser");
const port =8080;
const app = express();
const path = require("path")
const Post= require("./model/post.js");
const mongoose = require("mongoose");

const uri = `mongodb+srv://Pankaj:Pankaj@cluster0.v7dmhjp.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true);
mongoose.connect(uri,(err)=>{
    if(err){
        console.log("connection to mongodb failed");
    }
    else{
        console.log("monogdb connected successfully");
    }
})

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.post("/post", (req,res)=>{
    const {author,location,description} = req.body
    const {image_file} = req.files
    image_file.mv("./uploads/"+image_file.name,async(err)=>{
        if(err){
         res.json({
            message : err.message
         })
        }
        else{
            try{
                let post = await Post.create({
                author: author,
                location: location,
                description: description,
                image_file:image_file.name
               }) 
               res.json({
                status :"success",
                post
               })
            
                }catch(e){
                    res.json({
                        status :"failed",
                        message: e.message
                       })
                }
        }
    })
})

app.get("/postview",async(req,res)=>{
    try{
    let post = await Post.find().sort({ _id: -1 });
        res.status(200).json({
         post
        })
    }catch(e){
       message : e.message
    }
})
app.get('/image/:filename', (req, res) => {
    console.log(`./uploads/${req.params.filename}`);
    res.sendFile(path.join(__dirname, `./uploads/${req.params.filename}`));
})
app.listen(port,()=>{console.log(`sever is up at ${port}`)});