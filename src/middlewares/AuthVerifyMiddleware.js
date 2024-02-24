const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
module.exports = (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(500).json({
      success: "false",
      message: "Unauthorized user",
    });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.send({
        message: "Error in token verification .",
      });
    } else {
      req.email = decoded["email"];
      req.loggedIn = decoded["loggedIn"];
      next();
    }
  });
};
