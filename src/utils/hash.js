const argon = require("argon2");

const createHash = async (password) => {
  return await argon.hash(password)
}

const verifyHash = async(password, hash) => {
  return await argon.verify(hash, password);
}

module.exports = {
  createHash,
  verifyHash
}