import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
const UserSchema = new Schema({
    userName: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    aboutMe: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    userType:{
        type: String
    }
});

UserSchema.pre("save",function(next){
    const user = this;
    const hash = bcrypt.hashSync(user.password,10);
    user.aboutMe = "VOID";
    user.password = hash;
    user.userType= "Normal";
    next();   
});


export default mongoose.model("User",UserSchema);