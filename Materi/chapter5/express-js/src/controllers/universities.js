const universityService = require("../services/universities");
const { SuccessResponse } = require("../utils/response");

exports.GetUniversities = async (req, res, next) => {
    const data = await universityService.GetUniversities();
    SuccessResponse(res, data);
}