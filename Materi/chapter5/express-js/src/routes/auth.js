const express = require("express");
const {
    validateRegister, 
    validateLogin
} = require("../middlewares/auth");

const {
    Register, 
    Login 
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", validateRegister, Register);
router.post("/login", validateLogin, Login);

module.exports = router;
