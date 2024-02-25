const express = require("express");

const router = express.Router();
const { registerUser , authUser,allUser} = require("../controller/userControllers"); 

const {protect}  = require("../middlewares/authmiddleware")


router.route('/').post(registerUser).get(protect,allUser);
// router.route('/login').post(authUser);
router.post('/login',authUser);




module.exports = router;