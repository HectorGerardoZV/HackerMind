const Post = require("../models/Post");

exports.createPost = async(req,res,next)=>{
    try {
        const post = new Post(req.body);
        const save = await post.save();
        if(save){
            res.json({message: "YES"});
        }else{
            res.json({message: "NO"});
        }
        next();
    } catch (error) {
        
    }
}
exports.publicPosts = async(req,res,next)=>{
    try {
        const posts= await Post.find();
        res.json(posts);
    } catch (error) {
        next();        
    }
}