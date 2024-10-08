const studentService = require("../services/students");
const { SuccessResponse } = require("../utils/response");

exports.GetStudents = (req, res, next) => {
    const dataStudents = studentService.GetStudents(
        req.query?.name,
        req.query?.nickname
    );

    SuccessResponse(res, dataStudents);

}

exports.GetStudentById = (req, res, next) => {
    const {id} = req.params;
    const dataStudent = studentService.GetStudentById(id);
    SuccessResponse(res, dataStudent);
}

exports.CreateStudent = (req, res, next) => {
    const dataStudent = studentService.CreateStudent(req.body);
    SuccessResponse(res, dataStudent);
}

exports.DeleteStudentById = (req, res, next) => {
    const {id} = req.params;
    const dataStudent = studentService.DeleteStudentById(id);
    SuccessResponse(res, dataStudent);
}

exports.UpdateStudentById = (req, res, next) => {
    const {id} = req.params;
    const dataStudent = studentService.UpdateStudentById(id, req.body);
    SuccessResponse(res, dataStudent);
}


