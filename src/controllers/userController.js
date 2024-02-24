const UserModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const OtpModel = require("../models/OtpModel");
const EmailUtility = require("../utility/EmailUtility");

exports.createUser = async (req, res) => {
  try {
    const reqBody = req.body;
    let query = { email: reqBody["email"] };
    const user = await UserModel.findOne(query);
    if (user) {
      return res.json({
        success: false,
        message: "You already have an account with this email .",
      });
    }
    await UserModel.create(reqBody);
    return res.status(200).json({
      success: true,
      message: "User is  created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Error in user create :" + error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let { email } = req.params;
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: true,
        user,
      });
    }
    return res.json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Can not get user :" + error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    let email = reqBody["email"];
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let EmailText = "Your Verification Code is =" + OTPCode;
    let EmailSubject = "User verification code";
    // let result = await UserModel.findOne(reqBody).count();
    let user = await UserModel.find(reqBody);
    console.log(user);

    if (user) {
      ////////////////////// Send otp to email
      // await EmailUtility(email, EmailText, EmailSubject);

      await OtpModel.create({ email: email, otp: OTPCode });
      return res.status(200).json({
        success: true,
        data: "6 Digit Verification Code has been send",
        email: email,
        OTPCode,
      });
    } else {
      // Login fail
      return res.status(404).json({ status: "fail", data: "No User Found" });
    }
  } catch (err) {
    return res.status(500).json({ status: "fail", err });
  }
};

exports.updateuser = async (req, res) => {
  try {
    let email = req.email;
    let query = { email };
    let reqBody = req.body;
    await UserModel.updateOne(query, reqBody);
    res.status(200).json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", err });
  }
};
