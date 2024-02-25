const express = require("express");
const {accessChat} = require("../controller/chatControllers")
const {fetchChats , createGroupChat , renameGroup , addToGroup , removeFromGroup} = require("../controller/chatControllers")
const {protect} = require("../middlewares/authmiddleware");
const { route } = require("./userRoutes");

const router = express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect, fetchChats);

router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect , renameGroup);
router.route("/groupadd").put(protect , addToGroup);
router.route("/gropuremove").put(protect ,removeFromGroup);



module.exports = router ;




