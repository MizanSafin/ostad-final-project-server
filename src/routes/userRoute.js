const express = require("express");
const {
  createUser,
  login,
  getUser,
  updateuser,
} = require("../controllers/userController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login", login);
userRouter.get("/getuser/:email", getUser);
userRouter.post("/update", AuthVerifyMiddleware, updateuser);

module.exports = userRouter;
