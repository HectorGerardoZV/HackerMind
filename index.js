const express  = require("express");
const mongoose = require ("mongoose");
const router = require ("./router/router");
const cors = require ("cors");
const path = require("path");

//Server creation
const app = express();


//Static files
app.use(express.static("public"));

//Adding pug
app.set("view engine","pug");
app.set("views", path.join(__dirname, "./public/view"));



//Adding cors
app.use(cors());


//MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/HackerMind",{});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/",router);


//Starting server
app.listen(1000,()=>{
    console.log("Server runing: "+1000);
});