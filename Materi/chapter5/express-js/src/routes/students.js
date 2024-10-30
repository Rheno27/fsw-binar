const express = require("express");
const {authorization} = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");

const { 
    ValidateGetStudents,
    ValidateGetStudentById,
    ValidateCreateStudent,
    ValidateDeleteStudentById,
    ValidateUpdateStudentById
} = require("../middlewares/students");

const { 
    GetStudents, 
    GetStudentById,
    CreateStudent,
    DeleteStudentById,
    UpdateStudentById
} = require("../controllers/students");

const router = express.Router();

router
    .route("/")
    .get(authorization(adminRole, userRole), ValidateGetStudents, GetStudents)
    .post(authorization(adminRole), ValidateCreateStudent, CreateStudent);

router
    .route("/:id")
    .get(authorization(adminRole, userRole), ValidateGetStudentById, GetStudentById)
    .delete(authorization(adminRole), ValidateDeleteStudentById, DeleteStudentById)
    .put(authorization(adminRole), ValidateUpdateStudentById, UpdateStudentById); 

module.exports = router;


