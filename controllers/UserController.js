const User = require("../models/User");


exports.top5Users = async (req,res,next)=>{
    try {
        const top5Users = await User.find();
        res.json(top5Users);
        next();
    } catch (error) {
        res.json(null);
    }
}

exports.allUsers = async (req,res,next)=>{
    try {
        const users = await User.find({userType: "Normal"});
        res.json(users);
    } catch (error) {
        next();
    }
}


exports.findUser = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const user = await User.findOne({_id:id});
        res.json(user);
        next();
    } catch (error) {
        next();
    }
}

exports.getCurrentUser =  async (req,res,next)=>{
    try {
        const id = res.locals.user._id;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}