//Imports
import express  from "express";
import {signUp,login} from "../controllers/UserController.js";

//router
const router = express.Router();

//Routs
router.post("/signUp",signUp);
router.post("/login",login);


//Export
export default router;