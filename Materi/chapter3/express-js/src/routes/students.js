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

router.get("/", ValidateGetStudents, GetStudents);
router.get("/:id", ValidateGetStudentById, GetStudentById);
router.post("/", ValidateCreateStudent, CreateStudent);
router.delete("/:id", ValidateDeleteStudentById, DeleteStudentById);
router.put("/:id", ValidateUpdateStudentById, UpdateStudentById);

module.exports = router;


