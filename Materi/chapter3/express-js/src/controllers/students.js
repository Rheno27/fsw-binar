const studentService = require("../services/students");
const { SuccessResponse } = require("../utils/response");

exports.GetStudents = (req, res, next) => {
    const dataStudents = studentService.getStudents(
        req.query?.name,
        req.query?.nickname
    );

    SuccessResponse(res, dataStudents);

}

