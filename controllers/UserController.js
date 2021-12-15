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