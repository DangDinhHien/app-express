const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connect db!");
  } catch (error) {
    console.log("connect fail!");
  }
}

module.exports = { connect };
