const router = require('express').Router();
const verifyAuth = require('../middleware/authMiddleware');
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
} = require('../controllers/chatController');

router.route('/').post(verifyAuth, accessChat).get(verifyAuth, fetchChats);
router.route('/group').post(verifyAuth, createGroupChat);
router.route('/renameGroup').put(verifyAuth, renameGroup);
router.route('/addToGroup').put(verifyAuth, addToGroup);
router.route('/removeFromGroup').put(verifyAuth, removeFromGroup);

module.exports = router;
