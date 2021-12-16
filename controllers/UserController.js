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