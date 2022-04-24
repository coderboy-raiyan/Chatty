const router = require('express').Router();
const data = require('../data/data');
const userRouter = require('./userRouter');
const chatRouter = require('./chatRoutes');

router.use('/chats', async (req, res) => {
    res.send(data);
});

router.use('/user', userRouter);
router.use('/chat', chatRouter);

module.exports = router;
