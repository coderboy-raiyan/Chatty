/* eslint-disable camelcase */
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected');
    } catch (err) {
        console.log('DB connect problem');
    }
};

module.exports = connectDb;
