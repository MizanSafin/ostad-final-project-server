const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
//or

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set("strictQuery", false);

//Security Middleware Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const router = require("./src/routes/api");
const userRouter = require("./src/routes/userRoute");
const authRouter = require("./src/routes/authRouter");
const productRouter = require("./src/routes/productRoute");

//Security Middleware Implement
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cookieParser());

//Request Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//Mongodb connection

let URI = `mongodb://127.0.0.1:27017/OstadFinalProject`;
let OPTION = { user: "", pass: "", autoIndex: true };
mongoose
  .connect(URI, OPTION)
  .then(() => console.log("Database connected ."))
  .catch((err) => console.log(err));

app.use("/api/v1", router);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);

//Undefined Route
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

module.exports = app;
