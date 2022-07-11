const express = require("express");
const { getAllKeys, deleteUserKey } = require("../controllers/admin");

const router = express.Router();

router.get("/", getAllKeys);
router.delete("/:id/:key", deleteUserKey);

module.exports = router;