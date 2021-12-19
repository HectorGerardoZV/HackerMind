//Imports
const express  = require ("express");
const userController = require ("../controllers/UserController");
const accessController = require ("../controllers/AccessController");
const pagesController = require ("../controllers/PagesController");
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



//Pages
router.get("/",
    accessController.isAuthenticated,
    dashBoardController.dashBoard,
    pagesController.home
    );
router.get("/myPosts",
    accessController.isAuthenticated,
    pagesController.myPosts
    );
router.get("/specials",
    accessController.isAuthenticated,
    pagesController.specials
    );
router.get("/users",
    accessController.isAuthenticated,
    pagesController.users
    );
router.get("/myAccount",
    accessController.isAuthenticated,
    pagesController.myAccount
    );

//User Routes
router.get("/top5Users",userController.top5Users);
router.get("/findUser/:id",userController.findUser);
router.get("/myUser",userController.getCurrentUser);


//Post Routes
router.post("/createPost",postController.createPost);
router.get("/publicPosts",postController.publicPosts);
router.get("/myPosts/:id",postController.findPostsByUser);
router.get("/findPost/:id",postController.findPostsById);
router.get("/deletePost/:id",postController.deletePost);
router.post("/editPost",postController.editPost);


//Export
module.exports = router;