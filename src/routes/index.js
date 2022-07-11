const express = require("express");
const { verifyAuth } = require("../middlewares/auth");
const authRouter = require("./auth");
const userInfoRouter = require("./userInfo");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/info", verifyAuth(), userInfoRouter);
router.use("/admin", verifyAuth(true), adminRouter);

module.exports = router;