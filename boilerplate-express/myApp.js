require("dotenv").config();

let express = require("express");
let app = express();

console.log("Hello World");

// Normal usage
// app.use(express.static(__dirname + "/public"));
// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  // res.send("Hello Express");
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/json", function (req, res) {
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";

  res.json({ message });
});

module.exports = app;
