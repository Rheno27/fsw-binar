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

exports.CreateStudent = async (req, res, next) => {
    // Convert to student data format
    const requestBody = {
        ...req.body,
        address: {
            province: req.body["address.province"],
            city: req.body["address.city"],
        },
        education: {
            bachelor: req.body["education.bachelor"],
        }
    }
    delete requestBody["address.province"];
    delete requestBody["address.city"];
    delete requestBody["education.bachelor"];

    // Create the new student
    const dataStudent = await studentService.CreateStudent(requestBody, req.files);
    SuccessResponse(res, dataStudent);
}


exports.UpdateStudentById = async (req, res, next) => {
    const {id} = req.params;
    const requestBody = {
        ...req.body,
        address: {
            province: req.body["address.province"],
            city: req.body["address.city"],
        },
        education: {
            bachelor: req.body["education.bachelor"],
        }
    };
    delete requestBody["address.province"];
    delete requestBody["address.city"];
    delete requestBody["education.bachelor"];
    
    const dataStudent = await studentService.UpdateStudentById(id, requestBody, req.files);
    SuccessResponse(res, dataStudent);
}


exports.DeleteStudentById = async (req, res, next) => {
    const {id} = req.params;
    const dataStudent = await studentService.DeleteStudentById(id);
    SuccessResponse(res, dataStudent);
}
