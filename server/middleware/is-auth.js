const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  req.authData = {};

  if (!authHeader) {
    req.authData.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.authData.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    req.authData.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.authData.isAuth = false;
    return next();
  }

  req.authData = {
    isAuth: true,
    accessLevel: decodedToken.accessLevel,
    userId: decodedToken.userId,
  };
  next();
};
