const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.methods.generateJwt = async function (id) {
    const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return `Bearer ${token}`;
};

const model = mongoose.model('User', userSchema);

module.exports = model;
