/* eslint-disable consistent-return */
const multer = require('multer');
const path = require('path');
const ErrorHandler = require('./errorHandler');

const storage = multer.diskStorage({});

const validator = (req, file, cb) => {
    const allowedExtName = /jpeg|jpg|png/;
    const isAllowed = allowedExtName.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedExtName.test(file.mimetype);
    if (isAllowed && mimeType) {
        return cb(null, true);
    }
    cb(new ErrorHandler('Invalid file type. Only JPEG, PNG file are allowed.'));
};
const upload = multer({
    storage,
    fileFilter: validator,
    limits: { fileSize: 6000000 },
});

module.exports = upload;
