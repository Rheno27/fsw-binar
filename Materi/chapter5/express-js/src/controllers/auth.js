const authService = require("../services/auth");
const {SuccessResponse} = require("../utils/response");

exports.Register = async (req, res, next) => {
    const dataUser = await authService.Register(req.body, req.files);
    SuccessResponse(res, dataUser);
}

exports.Login = async (req, res, next) => {
    const dataUser = await authService.Login(req.body);
    SuccessResponse(res, dataUser);
}
