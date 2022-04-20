const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Please enter a valid password'],
        },
        pic: {
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
        },
    },
    { timestamps: true },
);

const model = mongoose.model('User', userSchema);

module.exports = model;
