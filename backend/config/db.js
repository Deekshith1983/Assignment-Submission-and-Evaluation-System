const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/assignmentDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;