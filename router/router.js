//Imports
const express  = require ("express");
const userController = require ("../controllers/UserController");
const accessController = require ("../controllers/AccessController");

//router
const router = express.Router();

//Routs
router.get("/login",accessController.loginForm);
router.post("/login",accessController.login);


router.get("/signUp",accessController.signUpForm);
router.post("/signUp",accessController.signUp);


//Export
module.exports = router;