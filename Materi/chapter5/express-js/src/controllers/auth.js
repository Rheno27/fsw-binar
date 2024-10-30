const authService = require("../services/auth");
const {SuccessResponse} = require("../utils/response");

exports.Register = async (req, res, next) => {
    const data = await authService.Register(req.body, req.files);
    SuccessResponse(res, data);
};

exports.Login = async (req, res, next) => {
    const data = await authService.Login(req.body.email, req.body.password);
    SuccessResponse(res, data);
};

exports.GetProfile = async (req, res, next) => {
    const data = req.user;

    // remove the password object
    delete data.password;

    SuccessResponse(res, data);
};