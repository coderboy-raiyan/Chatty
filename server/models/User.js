/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            minLength: [6, 'Password must be at least 6 characters'],
        },
        pic: {
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
        },
    },
    { timestamps: true },
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
    }
    next();
});

userSchema.methods.verifyPassword = async function (password) {
    const verified = await bcrypt.compare(password, this.password);
    return verified;
};

userSchema.methods.generateJwt = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return `Bearer ${token}`;
};

const model = mongoose.model('User', userSchema);

module.exports = model;
