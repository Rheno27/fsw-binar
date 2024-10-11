const express = require("express");


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
    .get(ValidateGetStudents, GetStudents)
    .post(ValidateCreateStudent, CreateStudent);

router
    .route("/:id")
    .get(ValidateGetStudentById, GetStudentById)
    .delete(ValidateDeleteStudentById, DeleteStudentById)
    .put(ValidateUpdateStudentById, UpdateStudentById); 

module.exports = router;


