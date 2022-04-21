const router = require('express').Router();
const data = require('../data/data');
const userRouter = require('./userRouter');

router.use('/chats', async (req, res) => {
    res.send(data);
});

router.use('/user', userRouter);

module.exports = router;
