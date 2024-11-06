const express = require("express");

const studentsRouter = require("./students");
const authRouter = require("./auth");
const universitiesRouter = require("./universities");
const classesRouter = require("./classes");
const router = express.Router();

router.use("/students", studentsRouter);
router.use("/auth", authRouter);
router.use("/universities", universitiesRouter);
router.use("/classes", classesRouter);

module.exports = router;

