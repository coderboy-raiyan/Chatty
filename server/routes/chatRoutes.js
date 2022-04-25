const router = require('express').Router();
const verifyAuth = require('../middleware/authMiddleware');
const { accessChat } = require('../controllers/chatController');

router.route('/').post(verifyAuth, accessChat);
// router.route("/group").post(createGroupChat)
// router.router("/renameGroup").put(renameGroup)
// router.route('/groupAdd').post(addToGroup)
// router.route("/groupRemove").put(removeFromGroup)

module.exports = router;
