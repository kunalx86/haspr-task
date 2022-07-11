const express = require("express");
const { register, login } = require("../controllers/auth");
const { validator } = require("../middlewares/bodyValidator");
const { verifyAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", verifyAuth(false), (req, res) => res.status(200).json(req.ctx));
router.post("/register", validator("register"), register);
router.post("/login", validator("login"), login);

module.exports = router;