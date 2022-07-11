const express = require("express");
const { register, login, getAllUsers } = require("../controllers/auth");
const { validator } = require("../middlewares/bodyValidator");
const { verifyAuth } = require("../middlewares/auth");
const { register: registerSchema } = require("../utils/validationSchema");

const router = express.Router();

router.get("/", verifyAuth(true), getAllUsers);
router.post("/register", validator(registerSchema), register);
router.post("/login", validator(registerSchema), login);

module.exports = router;