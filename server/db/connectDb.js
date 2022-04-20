const mongoose = require("mongoose");

const db_uri = "mongodb://localhost:27017/chatty";

const connectDb = async () => {
  try {
    await mongoose.connect(db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (err) {
    console.log("DB connect problem");
  }
};

module.exports = connectDb;
