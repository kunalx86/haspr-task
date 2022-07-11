const { getUserInfoById } = require("../models/UserInfo");

const deleteUserInfo = async (id, key) => {
  const userInfo = await keyExists(id, key);

  const filteredKeys = Object.keys(userInfo.data).filter(_key => _key !== key);
  const data = userInfo.data;
  userInfo.data = {};
  filteredKeys.forEach(key => {
    userInfo.data = {
      ...userInfo.data,
      [key]: data[key]
    }
  });
    
  await userInfo.save();
  return userInfo;
}

const keyExists = async (id, key) => {
  const userInfo = await getUserInfoById(id);
  if (!userInfo) throw new Error("Document doesn't exist");
  if (!Object.keys(userInfo.data).includes(key)) throw new Error("Key doesn't exist");

  return userInfo;
}

module.exports = {
  deleteUserInfo,
  keyExists
}