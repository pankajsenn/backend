const mongoose = require("mongoose")

const Postschema = mongoose.Schema({
    author: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    image_file:{
        type:String,
        require:true,
    },
    date:{
        type: Date,
		default: Date.now,
    }
},{timestamps:true});

const Post = mongoose.model("Post",Postschema);
module.exports = Post;