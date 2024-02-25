const express = require('express');
const {protect} = require('../middlewares/authmiddleware');

const router = express.Router();
const {
    allMessages,
    sendMessage,
  } = require("../controller/messageController");

router.route('/').post(protect ,sendMessage) ;
router.route('/:chatId').get(protect ,allMessages) ;


module.exports = router;


