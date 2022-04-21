const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/authController');
const upload = require('../lib/multer');

router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);

module.exports = router;
