const studentService = require("../services/students");
const { SuccessResponse } = require("../utils/response");

exports.GetStudents = async (req, res, next) => {
    // Call the usecase or service
    const data = await studentService.GetStudents(
        req.query?.name,
        req.query?.nickName
    );
    SuccessResponse(res, data);
};


exports.GetStudentById = async (req, res, next) => {
    const {id} = req.params;
    const dataStudent = await studentService.GetStudentById(id);
    SuccessResponse(res, dataStudent);
}

//create student menggunakan prisma
exports.CreateStudent = async (req, res, next) => {
    // Create the new student
    const data = await studentService.CreateStudent(req.body, req.files);
    SuccessResponse(res, data);
};


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
