//Imports
import express  from "express";
import {signUp} from "../controllers/UserController.js";

//router
const router = express.Router();

//Routs
router.post("/signUp",signUp);


//Export
export default router;