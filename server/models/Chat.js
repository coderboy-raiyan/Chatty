const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        latestMessages: {
            type: mongoose.Types.ObjectId,
            ref: 'Message',
        },
        groupAdmin: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const model = mongoose.model('Chat', chatSchema);

module.exports = model;
