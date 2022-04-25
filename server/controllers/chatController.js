/* eslint-disable no-underscore-dangle */

const Chat = require('../models/Chat');
const User = require('../models/User');
const ErrorHandler = require('../lib/errorHandler');
const { AsyncErrorHandler } = require('../middleware/createAsyncError');

// create one to one chat
module.exports.accessChat = AsyncErrorHandler(async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        next(new ErrorHandler('UserId params not went with request'));
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate('users', '-password')
        .populate('latestMessages');

    isChat = await User.populate(isChat, {
        path: 'latestMessages.sender',
        select: 'email pic name',
    });

    if (isChat.length < 0) {
        res.send(isChat[0]);
    } else {
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                'users',
                '-password',
            );
            console.log(createdChat);
            res.status(200).send(fullChat);
        } catch (error) {
            next(new ErrorHandler(error.message));
        }
    }
});

// fetch chats
module.exports.fetchChats = AsyncErrorHandler(async (req, res) => {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate('users', '-password')
        .populate('latestMessages')
        .populate('groupAdmin', '-password')
        .sort({ updatedAt: -1 });

    const request = await User.populate(chats, {
        path: 'latestMessages.sender',
        select: 'email name pic',
    });

    res.send(request);
});
