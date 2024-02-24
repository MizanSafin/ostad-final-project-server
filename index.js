const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();
let PORT = process.env.RUNNING_PORT || 3333;
app.listen(PORT, function () {
  console.log("App is running at the port : " + PORT);
});
