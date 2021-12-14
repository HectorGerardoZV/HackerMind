
const User = require("../models/User");
const bcrypt  = require( "bcrypt");

exports.signUp = async (req, res, next)=>{
  try {
        const user = new User(req.body);
        const newUser = await user.save();
        if(newUser){
          res.json({message:"YES"});
        }else{
          res.json({message: "NO"});
        }
       
        next();
        
  } catch (error) {
    console.log(error);
    res.json({message:"NO"});
  }
}
exports.login = async (req,res,next)=>{
  try {
    const user = req.body;
    const userFind = await User.findOne({userName: user.userName});
    if(userFind){
      const userValid = bcrypt.compareSync(user.password, userFind.password);
      if(userValid){
        res.json({message: "YES"});
      }else{
        res.json({message: "NO"});
      }
    }else{
      res.json({message: "NO"});
    }
    next();
  } catch (error) {
    next();
  }
}
exports.loginForm = (req,res,next)=>{
    res.render("Access",{
        namePage: "Login"
    });
    
}
exports.signUpForm = (req,res,next)=>{
    res.render("Access",{
        namePage: "SignUp"
    });
    
}