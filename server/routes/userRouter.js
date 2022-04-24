const router = require('express').Router();
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const upload = require('../lib/multer');
const verifyAuth = require('../middleware/authMiddleware');

router.get('/', verifyAuth, getUsers);
router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);

module.exports = router;
