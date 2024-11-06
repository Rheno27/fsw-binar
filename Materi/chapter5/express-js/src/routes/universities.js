const express = require("express");
const {authorization} = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");

const {
    GetUniversities,

} = require("../controllers/universities");

const router = express.Router();

router
    .route("/")
    .get(authorization(adminRole, userRole), GetUniversities)

module.exports = router;

