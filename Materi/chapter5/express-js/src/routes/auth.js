const express = require("express");
    
const {authorization} = require("../middlewares/auth");

const {
    validateRegister, 
    validateLogin
} = require("../middlewares/auth");

const {
    Register, 
    Login,
    GetProfile
} = require("../controllers/auth");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router.post("/register", validateRegister, Register);
router.post("/login", validateLogin, Login);
router.get("/profile", authorization(adminRole, userRole), GetProfile);

module.exports = router;
