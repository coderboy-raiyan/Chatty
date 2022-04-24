/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const { AsyncErrorHandler } = require('../middleware/createAsyncError');
const User = require('../models/User');
const ErrorHandler = require('../lib/errorHandler');
const cloudinary = require('../lib/cloudinary');

module.exports.registerUser = AsyncErrorHandler(async (req, res, next) => {
    const isUserExists = await User.findOne({ email: req.body.email });
    if (isUserExists) {
        return next(new ErrorHandler('User already exists'));
    }
    console.log(req.file);
    try {
        if (req.file) {
            const upload = await cloudinary.uploader.upload(req.file.path, {
                folder: `Chatty/profile/${req.body.email.trim().toLowerCase()}`,
                resource_type: 'auto',
            });

            req.body.pic = upload.secure_url;
        }
        const result = await User.create(req.body);
        if (result) {
            const token = await result.generateJwt();
            const data = {
                email: result.email,
                name: result.name,
                pic: result.pic,
                token,
            };
            res.status(200).send({
                success: true,
                message: 'Successfully registered',
                data,
            });
        }
    } catch (err) {
        next(new ErrorHandler('There is an error in cloudinary'));
    }
});

module.exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('Invalid email or password'));
    }
    const isVerified = await user.verifyPassword(req.body.password);

    if (isVerified) {
        const token = await user.generateJwt();
        const data = {
            email: user.email,
            name: user.name,
            pic: user.pic,
            token,
        };

        res.status(200).send({
            success: true,
            message: 'Logged in successfully',
            data,
        });
    } else {
        next(new ErrorHandler('Invalid email and password'));
    }
});

// get searched users
module.exports.getUsers = AsyncErrorHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
              $or: [
                  {
                      name: { $regex: req.query.search, $options: 'i' },
                  },
                  {
                      email: { $regex: req.query.search, $options: 'i' },
                  },
              ],
          }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).send({
        success: true,
        data: users,
    });
});
