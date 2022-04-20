const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: mongoose.Types.ObjectId,
            ref: 'Chat',
        },
    },
    { timestamps: true },
);

const model = mongoose.model('Message', messageSchema);

module.exports = model;
