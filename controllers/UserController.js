import User from "../models/User.js";
import bcrypt from "bcrypt";

const signUp = async (req, res, next)=>{
  try {
        const user = new User(req.body);
        const newUser = await user.save();
        res.json({"message":"YES"});
        next();
        
  } catch (error) {
    console.log(error);
    res.json({"message":"NO"});
  }
}

const login = async(req,res,next)=>{
  try {
    const user = req.body;
    const userFind = await User.findOne({userName:user.userName });
    const userValid = bcrypt.compareSync(user.password, userFind.password);

    if(userFind){
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



export{
    signUp,
    login
}