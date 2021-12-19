const Comment = require("../models/Comment");

exports.addComment = async(req,res,next)=>{
    try {
        const comment = new Comment(req.body); 
        const saved = await comment.save();

        if(saved){
            res.json({message: "YES"});
        }else{
            res.json({message: "NO"});
        }
        next();
    } catch (error) {
        res.json({message: "NO"});
    }
}
exports.findCommentsByIdPost = async (req,res,next)=>{
    try {
        const {id} = req.params;
        let comments = await Comment.find({idPost:id});
        comments = comments.reverse();
        res.json(comments);
        next();
    } catch (error) {
        next();
    }
}