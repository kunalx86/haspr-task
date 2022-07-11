const express = require("express");

const { getKeys, createKeys, modifyKey, deleteKey } = require("../controllers/userInfo");
const { validator } = require("../middlewares/bodyValidator");
const { userInfo, userInfoModify } = require("../utils/validationSchema");

const router = express.Router();

router.post("/", validator(userInfo), createKeys);
router.put("/", validator(userInfoModify), modifyKey);
router.delete("/:key", deleteKey);
router.get("/", getKeys);

module.exports = router;