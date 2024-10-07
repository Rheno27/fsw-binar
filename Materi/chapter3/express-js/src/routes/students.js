const express = require("express");

const { ValidateGetStudents } = require("../middlewares/students");
const { GetStudents } = require("../controllers/students");

const router = express.Router();

router.get("/", ValidateGetStudents, GetStudents);

module.exports = router;


