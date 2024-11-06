const express = require("express");
const {authorization} = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");

const {
    GetClasses,
} = require("../controllers/classes");

const router = express.Router();

router
    .route("/")
    .get(authorization(adminRole, userRole), GetClasses);

module.exports = router;

