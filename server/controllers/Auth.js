/* eslint-disable consistent-return */
const { AsyncErrorHandler } = require('../middleware/createAsyncError');
const User = require('../models/User');
const ErrorHandler = require('../lib/errorHandler');

module.exports.registerUser = AsyncErrorHandler(async (req, res, next) => {
    const isUserExists = await User.findOne({ email: req.body.email });

    if (isUserExists) {
        return next(new ErrorHandler('User already exists'));
    }

    const result = await User.create(req.body);
    if (result) {
        const token = await user.generateJwt(result._id);
        const data = {
            email: result.email,
            name: result.name,
            pic: result.pic,
            token: token,
        };

        res.status(200).send({
            success: true,
            message: 'Successfully registered',
            data,
        });
    }
});
