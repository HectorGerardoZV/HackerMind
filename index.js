import express  from "express";
import mongoose from "mongoose";
import router from "./router/router.js";
import cors from "cors";

//Server creation
const app = express();

//Cors options
const validURL = ["http://127.0.0.1:5500"];
const corsOptions = {
    origin: (origin, callback)=>{
        const isExist = validURL.some(url=> url===origin);
        if(isExist){
            callback(null, true);
        }else{
            callback(new Error("Delegated Access"));
        }
    }
}
//Cors Added
app.use(cors());


//MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/HackerMind",{});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/",router);


//Starting server
app.listen(1000,()=>{
    console.log("Server Started");
});