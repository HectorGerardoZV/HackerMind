const User  = require("../models/User");
exports.dashBoard = async (req,res,next)=>{
    try {
        const id = res.locals.user._id;
        const user = await User.findById(id);

        if(user.userType=="Administrator"){
            res.render("DashBoard",{
                namePage: "HackerMind",
                user
            });
        }else{
            return next();
        }

       
    } catch (error) {
        console.log(error);
    }
}