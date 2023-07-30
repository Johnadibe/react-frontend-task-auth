const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/post");

const app = express();

app.use(express.json());

app.use("/auth", auth);
app.use("/posts", post);

app.get("/login", (req, res) => {
  //Authenticate User
});
app.listen(8000, () => {
  console.log("Port running on 8000!");
});
