const router = require('express').Router();
const verifyAuth = require('../middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messageController');

router.route('/').post(verifyAuth, sendMessage);
router.route('/:chatId').get(verifyAuth, allMessages);

module.exports = router;
