/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AsyncErrorHandler } = require('./createAsyncError');
const ErrorHandler = require('../lib/errorHandler');

const verifyAuth = AsyncErrorHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded).select('-password');

            next();
        } catch {
            next(new ErrorHandler('Not authorized, token failed'));
        }
    }

    if (!token) {
        next(new ErrorHandler('Not authorized, token failed', 401));
    }
});

module.exports = verifyAuth;
