/* eslint-disable no-underscore-dangle */
const ErrorHandler = require('../lib/errorHandler');
const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');
const { AsyncErrorHandler } = require('../middleware/createAsyncError');

// create a message
exports.sendMessage = AsyncErrorHandler(async (req, res, next) => {
    const { content, chatId } = req.body;

    if (!content && !chatId) {
        next(new ErrorHandler('Invalid data passed in request'));
        return;
    }

    const newMessage = {
        sender: req.user._id,
        content,
        chat: chatId,
    };

    let message = await Message.create(newMessage);

    message = await message.populate('sender', 'name pic');
    message = await message.populate('chat');
    message = await User.populate(message, {
        path: 'chat.users',
        select: 'email name pic',
    });

    await Chat.findByIdAndUpdate({ _id: chatId }, { latestMessages: message });

    res.status(200).json({
        success: true,
        message,
    });
});

// get all the messages
exports.allMessages = AsyncErrorHandler(async (req, res, next) => {
    if (!req.params.chatId) {
        next(new ErrorHandler('ChatId is not provided'));
        return;
    }
    const messages = await Message.find({ chat: req.params.chatId })
        .populate('sender', 'name pic')
        .populate('chat');

    const request = await User.populate(messages, {
        path: 'chat.users',
        select: 'email name pic',
    });

    res.status(200).json({ success: true, data: request });
});
