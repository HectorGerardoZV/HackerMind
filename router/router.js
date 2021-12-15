//Imports
const express  = require ("express");
const userController = require ("../controllers/UserController");
const accessController = require ("../controllers/AccessController");
const homeController = require ("../controllers/HomeController");
const dashBoardController = require ("../controllers/DashBoardController");

//router
const router = express.Router();

//Routs
//AccessRouter
router.get("/login",accessController.loginForm);
router.post("/login",accessController.login);
router.get("/logout",accessController.logout);
router.get("/signUp",accessController.signUpForm);
router.post("/signUp",accessController.signUp);

//Functions
router.get("/top5Users",userController.top5Users);

router.get("/",
    accessController.isAuthenticated,
    dashBoardController.dashBoard,
    homeController.home
    );
//Export
module.exports = router;