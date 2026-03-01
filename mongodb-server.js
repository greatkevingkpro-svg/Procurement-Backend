
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { usersModel } = require("./models/users.js")

const URI = process.env.MONGODB_URI

async function connectDbHashPassword() {
  try {
    await mongoose.connect(URI)
    console.log("connected to the mongodb database");

    const users = await usersModel.find({});
    for (let user of users) {
      // only hash passwords that are not already hashed
      if (!user.password.startsWith("$2b$")) {
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        console.log(`Updated password for user: ${user.email}`);
      }
    }

    console.log("Migration complete");
  } catch {
    console.log(err);
  }
}

module.exports = {connectDbHashPassword}