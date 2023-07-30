const express = require("express");
const JWT = require("jsonwebtoken");
const cors = require("cors");
// const auth = require("./routes/auth");
// const post = require("./routes/post");

const app = express();

app.use(cors());

const users = [
  {
    username: "johndoe",
    password: "password",
  },
  {
    username: "bobby",
    password: "password",
  },
];

app.use(express.json());
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((user) => user.username === username);
  if (user) {
    // response with not authenticated
    return res.json({ success: false, message: "This user already exists" });
  }

  users.push({
    username,
    password,
  });

  //generate the json webtoken
  const token = JWT.sign({ username }, "SECRETKEY");
  res.json({ success: true, token: token });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    //generate the json webtoken
    const token = JWT.sign({ username: user.username }, "SECRETKEY");
    res.json({ success: true, token: token });
  } else {
    // response with not authenticated
    res.json({ success: false, message: "Not Authenticated" });
  }
});

app.listen(8080, () => {
  console.log("Port running on 8080!");
});
