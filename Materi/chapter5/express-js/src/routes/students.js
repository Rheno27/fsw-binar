const express = require("express");
const {authorization} = require("../middlewares/auth");

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
    .get(authorization(1, 2), ValidateGetStudents, GetStudents)
    .post(authorization(1), ValidateCreateStudent, CreateStudent);

router
    .route("/:id")
    .get(authorization(1, 2), ValidateGetStudentById, GetStudentById)
    .delete(authorization(1), ValidateDeleteStudentById, DeleteStudentById)
    .put(authorization(1), ValidateUpdateStudentById, UpdateStudentById); 

module.exports = router;


