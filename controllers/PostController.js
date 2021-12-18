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
        let posts= await Post.find();
        posts = posts.reverse();
        res.json(posts);
    } catch (error) {
        next();        
    }
}

exports.findPostsByUser = async(req,res,next)=>{
    try {
        const {id} = req.params;
        let posts = await Post.find({idUser:id});
        posts = posts.reverse();
        res.json(posts);
        next();
    } catch (error) {
        next();
    }
}
exports.findPostsById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        let post = await Post.findOne({_id:id});
       
        res.json(post);
        next();
    } catch (error) {
        next();
    }
}
exports.deletePost = async(req,res,next)=>{
    try {
        const {id} = req.params;
        let post = await Post.findOneAndDelete({_id: id});
        if(post){
            res.json({message: "YES"});
        }else{
            res.json({message: "NO"});
        }
        next();
    } catch (error) {
        res.json({message: "NO"});
    }
}
exports.editPost = async(req,res,next)=>{
    try {
        const post = req.body;
        let postNew = await Post.findOneAndUpdate({_id: post._id},{
            title: post.title,
            idCategory: post.idCategory,
            content: post.content
        },{new: true});
        if(postNew){
            res.json({message: "YES"});
        }else{
            res.json({message: "NO"});
        }
        next();
    } catch (error) {
        res.json({message: "NO"});
    }
}