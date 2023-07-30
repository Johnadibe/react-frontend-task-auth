const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "No token found",
        },
      ],
    });
  }

  try {
    let user = await JWT.verify(token, process.env.TOKEN_SECRET);
    req.user = user.username;
    next();
  } catch (err) {
    return res.status(403).json({
      errors: [
        {
          msg: "Token invalid",
        },
      ],
    });
  }
};
