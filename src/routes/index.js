const express = require("express");
const { verifyAuth } = require("../middlewares/auth");
const authRouter = require("./auth");
const userInfoRouter = require("./userInfo");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/info", verifyAuth(), userInfoRouter);

module.exports = router;