const mongoose = require("mongoose");

const userInfoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  }
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

const getUserInfoById = async (user) => {
  const userInfo = await UserInfo.findOne({
    user
  });
  return userInfo;
}

module.exports = {
  UserInfo,
  getUserInfoById
};