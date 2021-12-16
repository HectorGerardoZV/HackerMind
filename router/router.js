//Imports
const express  = require ("express");
const userController = require ("../controllers/UserController");
const accessController = require ("../controllers/AccessController");
const homeController = require ("../controllers/HomeController");
const dashBoardController = require ("../controllers/DashBoardController");
const postController = require("../controllers/PostController");

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
router.get("/findUser/:id",userController.findUser)

router.get("/",
    accessController.isAuthenticated,
    dashBoardController.dashBoard,
    homeController.home
    );

router.post("/createPost",postController.createPost);
router.get("/publicPosts",postController.publicPosts);
//Export
module.exports = router;