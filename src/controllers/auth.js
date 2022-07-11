const { verifyHash, createHash } = require("../utils/hash");
const { createAndSignToken } = require("../utils/jwt");
const { User } = require("../models/User");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username
    });
    
    if (!user) throw new Error("No such user");
    if (!(await verifyHash(password, user.password))) throw new Error("Wrong password");

    // Create and sign jwt token and send it    
    const token = await createAndSignToken({
      username: user.username,
      isAdmin: user.isAdmin
    });

    res.status(200).json({
      token
    });
  } catch (err) {
    return next(err);
  }
}

const register = async (req, res, next) => {
  // Body will already be validated
  const { username, password } = req.body;

  try {
    const hashPassword = await createHash(password);
    await User.create({
      username,
      password: hashPassword
    });

    res.status(201).json({
      message: "Registration successful"
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  login,
  register
};