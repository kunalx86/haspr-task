const { getUserInfoById, UserInfo } = require("../models/UserInfo");
const { keyExists, deleteUserInfo } = require("../lib/userInfo");

const getKeys = async (req, res, next) => {
  try {
    const userInfo = await getUserInfoById(req.ctx._id);
    res.status(200).json(userInfo);
  } catch (err) {
    return next(err);
  }
}

const createKeys = async (req, res, next) => {
  // List of key, value pair
  const { data } = req.body;
  try {
    let userInfo = await getUserInfoById(req.ctx._id);
    if (!userInfo) userInfo = new UserInfo({
      user: req.ctx._id,
      data: {}
    });

    data.forEach(({ key, value }) => {
      userInfo.data = {
        ...userInfo.data,
        [key]: value
      }
    });

    await userInfo.save();
    res.status(200).json(userInfo);
  } catch (err) {
    return next(err);
  }
}

const modifyKey = async (req, res, next) => {
  const { key, value } = req.body;
  try {
    const userInfo = await keyExists(req.ctx._id, key);

    userInfo.data = {
      ...userInfo.data,
      [key]: value
    };
    res.status(200).json(
      (await userInfo.save())
    );
  } catch (err) {
    return next(err);
  }
}

const deleteKey = async (req, res, next) => {
  const { key } = req.params;
  if (!key || typeof key !== "string") return next(new Error("Key must be in url"));

  try {
    const userInfo = await deleteUserInfo(req.ctx._id, key); 
    res.status(200).json(userInfo);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getKeys,
  createKeys,
  modifyKey,
  deleteKey,
};