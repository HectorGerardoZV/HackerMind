const User  = require("../models/User");
exports.home = async (req,res,next)=>{
    try {
        const id = res.locals.user._id;
        const user = await User.findById(id);
        res.render("Home",{
            namePage: "HackerMind",
            user
        });
    } catch (error) {
        console.log(error);
    }
}

exports.myPosts = async (req,res,next)=>{
    try {
        res.render("MyPosts",{
            namePage : "MyPosts"
        });
    } catch (error) {
        
    }
}
exports.specials = async (req,res,next)=>{
    try {
        res.render("Specials",{
            namePage : "Specials"
        });
    } catch (error) {
        
    }
}
exports.users = async (req,res,next)=>{
    try {
        res.render("Users",{
            namePage : "Users"
        });
    } catch (error) {
        
    }
}
exports.viewProfile = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const userProfile = await User.findOne({_id:id});
        res.render("UserProfile",{
            namePage : "userProfile",
            userProfile
        });
    } catch (error) {
        
    }
}
exports.myAccount = async (req,res,next)=>{
    try {
        res.render("MyAccount",{
            namePage : "MyAccount"
        });
    } catch (error) {
        
    }
}