
const User = require("../models/User");
const bcrypt  = require( "bcrypt");
const passport = require("passport");

exports.isAuthenticated = (req, res, next)=>{
  if(req.isAuthenticated()){
      return next();
  }
  else{
      return res.redirect("/login");
  }
}
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
exports.login =passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login",
});

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
exports.logout = (req, res)=>{
  req.session.destroy(()=>{
      res.redirect("/login");
  })
}