const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post(
  "/signup",
  [
    check("username", "Please enter a proper username").isLength({ min: 4 }),
    check(
      "password",
      "Please provide a password that is greater than 7 characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const { password, username } = req.body;

    const errors = validationResult(req);

    //VALIDATED INPUT
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // VALIDATE IF USER DOESN'T ALREADY EXIST
    let user = users.find((user) => {
      return user.username === username;
    });

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "This user already exists",
          },
        ],
      });
    }

    users.push({
      username,
      password,
    });

    // JWT
    const token = await jwt.sign(
      {
        username,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2m",
      }
    );
  }
);
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let user = users.find((user) => {
    return user.username === username;
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  if (password !== user.password) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  // JWT
  const token = await jwt.sign(
    {
      username,
    },
    "SECRET_KEY",
    {
      expiresIn: 2600000,
    }
  );
  // console.log(password, username);
  res.json({
    token,
  });
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
