/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
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

    if (isChat.length > 0) {
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

// createGroup chat
module.exports.createGroupChat = AsyncErrorHandler(async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        return next(new ErrorHandler('Please fill all the fields'));
    }
    // let users;
    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return next(new ErrorHandler('More then 2 users are required', 400));
    }

    users.push(req.user);

    const grpChat = await Chat.create({
        chatName: req.body.name,
        isGroupChat: true,
        users,
        groupAdmin: req.user,
    });
    const fullGrpChat = await Chat.find({ _id: grpChat._id })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');

    res.status(200).send(fullGrpChat);
});

// rename group
module.exports.renameGroup = AsyncErrorHandler(async (req, res, next) => {
    if (!req.body.chatName || !req.body.chatId) {
        return next(new ErrorHandler('Please fill the necessary fields'));
    }

    const updatedName = await Chat.findByIdAndUpdate(
        { _id: req.body.chatId },
        { chatName: req.body.chatName },
        { new: true },
    );
    res.status(200).send(updatedName);
});

// Add to group
module.exports.addToGroup = AsyncErrorHandler(async (req, res, next) => {
    if (!req.body.userId || !req.body.chatId) {
        return next(new ErrorHandler('Please fill the necessary fields'));
    }

    const added = await Chat.findByIdAndUpdate(
        req.body.chatId,
        {
            $push: { users: req.body.userId },
        },
        { new: true },
    )
        .populate('users', '-password')
        .populate('groupAdmin', '-password');

    if (!added) {
        next(new ErrorHandler('Chat not found'));
    } else {
        res.status(200).send(added);
    }
});

// Remove a user from group
module.exports.removeFromGroup = AsyncErrorHandler(async (req, res, next) => {
    if (!req.body.userId || !req.body.chatId) {
        return next(new ErrorHandler('Please fill the necessary fields'));
    }

    const remove = await Chat.findByIdAndUpdate(
        req.body.chatId,
        {
            $pull: { users: req.body.userId },
        },
        { new: true },
    )
        .populate('users', '-password')
        .populate('groupAdmin', '-password');

    if (!remove) {
        next(new ErrorHandler('Chat not found'));
    } else {
        res.status(200).send(remove);
    }
});
