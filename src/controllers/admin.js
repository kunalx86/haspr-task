const { UserInfo } = require("../models/UserInfo");
const { deleteUserInfo } = require("../lib/userInfo");

const getAllKeys = async (req, res, next) => {
  try {
    const userInfos = await UserInfo.find({});
    res.status(200).json(userInfos);
  } catch (err) {
    return next(err);
  }
}

const deleteUserKey = async (req, res, next) => {
  const { id, key } = req.params;
  if (!id || !key || typeof id !== "string" || typeof key !== "string")
    return next(new Error("Id and Key should be of type string"));
  
  try {
    const userInfo = await deleteUserInfo(id, key);
    res.status(200).json(userInfo);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllKeys,
  deleteUserKey
}