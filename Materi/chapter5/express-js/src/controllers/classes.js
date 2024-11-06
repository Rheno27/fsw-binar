const classService = require("../services/classes");
const { SuccessResponse } = require("../utils/response");

exports.GetClasses = async (req, res, next) => {
    const data = await classService.GetClasses();
    SuccessResponse(res, data);
}