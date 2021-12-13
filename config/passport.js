import passport from "passport";
import local from "passport-local";;
const localStrategy = local.Strategy;

//Model reference
import User from "../models/User.js";


passport.use(
    new localStrategy(
        {
            usernameField: "userName",
            passwordField: "password"
        },
        async (userName, password, done)=>{
            try {
                const user = await User.findOne({
                    where:{
                        userName:userName
                    }
                });

                if(!user.verifyPassword(password)){
                    return done(null, false,{
                        message: "Credentials Invalid"
                    });
                }
                
                return done(null, user);

            } catch (error) {
                return done(null, false,{
                    message: "Credentials Invalid"
                });
            }
        }

    )
);
passport.serializeUser((user,callback)=>{
    callback(null, user);
})

passport.deserializeUser((user,callback)=>{
    callback(null, user);
})


export default passport;