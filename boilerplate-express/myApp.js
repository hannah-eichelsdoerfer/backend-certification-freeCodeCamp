require("dotenv").config();

let express = require("express");
let app = express();

// Challenge 11
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// In order to parse JSON data sent in the POST request, use bodyParser.json() as the middleware as shown below:
// app.use(bodyParser.json());

// Challenge 7
const middleware = (req, res, next) => {
  // Do something
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  // Call the next function in line:
  next();
};
app.use(middleware);

// Challenge 1
console.log("Hello World");

// Challenge 2
// Normal usage
// app.use(express.static(__dirname + "/public"));
// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

// Challenge 3
app.get("/", function (req, res) {
  // Challenge 4
  // res.send("Hello Express");
  // Challenge 5
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

// Challenge 6
app.get("/json", function (req, res) {
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";

  res.json({ message });
});

// Challenge 8
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

// Challenge 9
app.get("/:word/echo", function (req, res) {
  const word = req.params.word;
  res.json({ echo: word });
});

const getFirstAndLastName = (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
};

const sendFirstNameAndLastName = (req, res) => {
  const { first, last } = req.body;
  const fullName = `${first} ${last}`;
  res.json({ name: fullName });
};

// Challenge 10
app
  .route("/name")
  .get(getFirstAndLastName) // http://localhost:3000/name?first=hannah&last=eich
  .post(sendFirstNameAndLastName);

module.exports = app;
