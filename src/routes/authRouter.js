const express = require("express");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const OtpModel = require("../models/OtpModel");
const UserModel = require("../models/UsersModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

authRouter.post("/verify-login", async (req, res) => {
  try {
    let { email, otp } = req.body;
    let loggedIn = true;
    let otpResult = await OtpModel.findOne({ email, otp });

    ////////////////////// Create Token & set token to cookie
    let Payload = {
      email: email,
      loggedIn: loggedIn,
    };
    let token = jwt.sign(Payload, process.env.JWT_KEY, { expiresIn: "24h" });

    res.cookie("token", token, {
      httpOnly: true,
      // secure:true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    // Login suceess
    if (otpResult) {
      return res.status(200).json({
        success: true,
        otpResult,
        loggedIn,
        token,
      });
    }
    return res.json({
      success: false,
      message: "Otp verification fail",
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", error });
  }
});

authRouter.get("/verify", AuthVerifyMiddleware, async (req, res) => {
  let email = req.email;
  let user = await UserModel.findOne({ email: email });

  return res.status(200).json({
    login: true,
    user,
  });
});
authRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({
    logout: true,
    message: "Logout successfully .",
  });
});

module.exports = authRouter;
