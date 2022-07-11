const jwt = require("jsonwebtoken");

/*
* {
*   username,
*   isAdmin
* }
*/
const createAndSignToken = async (body) => {
  return await jwt.sign(body, process.env.JWT_SECRET, {
    expiresIn: "30m"
  });
}

const validateToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
}

// Only call if token has been validated
const decodeToken = async (token) => {
  return await jwt.decode(token);
}

module.exports = {
  createAndSignToken,
  validateToken,
  decodeToken
}