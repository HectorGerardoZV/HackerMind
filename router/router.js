//Imports
const express  = require ("express");
const userController = require ("../controllers/UserController");
const accessController = require ("../controllers/AccessController");
const homeController = require ("../controllers/HomeController");

//router
const router = express.Router();

//Routs
router.get("/login",accessController.loginForm);
router.post("/login",accessController.login);


router.get("/signUp",accessController.signUpForm);
router.post("/signUp",accessController.signUp);

router.get("/",
    accessController.isAuthenticated,
    homeController.home
    );
//Export
module.exports = router;