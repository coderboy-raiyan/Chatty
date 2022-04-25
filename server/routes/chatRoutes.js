const router = require('express').Router();
const verifyAuth = require('../middleware/authMiddleware');
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
} = require('../controllers/chatController');

router.route('/').post(verifyAuth, accessChat).get(verifyAuth, fetchChats);
router.route('/group').post(verifyAuth, createGroupChat);
router.route('/renameGroup').put(verifyAuth, renameGroup);
// router.route('/groupAdd').post(addToGroup)
// router.route("/groupRemove").put(removeFromGroup)

module.exports = router;
