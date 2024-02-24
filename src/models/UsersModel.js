const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    loggedIn: { type: Boolean, default: true },
    avatar: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png",
    },
  },
  { versionKey: false, timestamps: true }
);

let UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
