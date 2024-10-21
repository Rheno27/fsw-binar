const express = require("express");

const studentsRouter = require("./students");
const authRouter = require("./auth");

const router = express.Router();

router.use("/students", studentsRouter);
router.use("/auth", authRouter);

module.exports = router;

