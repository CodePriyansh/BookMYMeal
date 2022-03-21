const express = require('express');
const { response, request } = require('express');
const userController = require('../controller/user.controller');
const cartController = require("../controller/cart.controller");
const foodPackages = require("../controller/foodPackage.controller");
const favourateController = require("../controller/favourate.controller");
const category = require("../controller/category.controller");
const { route } = require('./admin.route');
// const {body} =require('express-validator');

const router = express.Router();

router.get("/sendOtp/:name/:email/:number"
   //    ,body("username","please enter valid username").isAlpha()
   //    ,body("email","please enter valid email").isEmail()
   //    ,body("password","password must be 5 letter long").isLength(5)
   //    ,body("mobile","please enter valid mobile number").isLength(10)
   , userController.sendOtp);

router.post("/signup/:otp"
   //    ,body("username","please enter valid username").isAlpha()
   //    ,body("email","please enter valid email").isEmail()
   //    ,body("password","password must be 5 letter long").isLength(5)
   //    ,body("mobile","please enter valid mobile number").isLength(10)
   , userController.Signup);

router.get("/signin"
   // ,body("email","please enter valid email").isEmail()
   // ,body("password","password must be 5 letter long").isLength(5)
   , userController.signin);

router.get("/forgotPass/:email"
   // ,body("email","please enter valid email").isEmail()
   // ,body("password","password must be 5 letter long").isLength(5)
   , userController.forgotPass);

router.post('/forgotPassSet',userController.forgotPassSet)


router.post("/addtocart", cartController.addToCart);
router.get("/viewcart/:id", cartController.viewcartone);
router.delete("/deletecart/:id/:packageId", cartController.deleteOneProduct);
// router.get("/viewcartone/:id",cartController.viewcartone);

router.post("/addtofavourate", favourateController.addtofavourate);
router.get("/viewfavourate/:id", favourateController.viewfavourateone);
router.delete("/deletefavourate/:id", favourateController.deletefavourate);
router.delete("/deleteOnefavourate/:id/:packageId", favourateController.deleteOnefavourate);

router.get("/allfooditems", foodPackages.viewallfoodlist);
router.post("/foodbyname", foodPackages.viewfoodbynamelist);
router.get("/packages/:id", foodPackages.viewcategoryWise);

router.post("/updateprofile", userController.updateprofile);


module.exports = router;