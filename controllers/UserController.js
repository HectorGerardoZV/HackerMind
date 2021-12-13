import User from "../models/User.js";

const signUp = async (req, res, next)=>{
  try {
        const user = new User(req.body);
        const newUser = await user.save();
        res.json({"message":"YES"});
        next();
        
  } catch (error) {
    res.json({"message":"NO"});
  }
}


export{
    signUp
}