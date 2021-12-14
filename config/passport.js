const passport = require("passport");
const bcrypt= require("bcrypt");
const strategy =require( "passport-local").Strategy;
const User = require("../models/User");

//LocalStrategy
passport.use(new strategy(
    {
        usernameField: "userName",
        passwordField: "password"
    },
    async (userName, password, done)=>{
        try {
            const user = await User.findOne({userName});
            const userValid = bcrypt.compareSync(password, user.password);
            if(!userValid){
                return done(null,false,{});
            }
            return done(null, user);


        } catch (error) {
            return done(null, false,{});
        }
    }
));

passport.serializeUser((user, callback)=>{
    callback(null,user);
});
passport.deserializeUser((user, callback)=>{
    callback(null,user);
});
module.exports = passport;