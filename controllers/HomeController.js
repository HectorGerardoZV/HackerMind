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