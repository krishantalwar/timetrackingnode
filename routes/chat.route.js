let express = require("express");
let router = express.Router();
const { validate } = require("../utills/validators/validate_validator");
const validation = require("../utills/validators/myspots_validators");
let chatCtrl = require("../controllers/chat.ctrl");

router.get("/", chatCtrl.getChatUsersCtrl);
router.get("/getOne2One", chatCtrl.getOne2OneChatCtrl);
router.get("/unreadcount/", chatCtrl.getUnreadCountCtrl);
router.post("/", chatCtrl.sendChatCtrl);
router.post("/startnode", chatCtrl.startChatNodeCtrl);

// router.delete("/",chatCtrl.deleteChat);

module.exports = router;
