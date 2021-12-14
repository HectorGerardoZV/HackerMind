const mongoose = require( "mongoose");
const Schema = mongoose.Schema;
const bcrypt = require( "bcrypt");
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


module.exports= mongoose.model("User",UserSchema);