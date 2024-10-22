const authService = require("../services/auth");
const {SuccessResponse} = require("../utils/response");

exports.Register = async (req, res, next) => {
    const dataUser = await authService.Register(req.body, req.files);
    SuccessResponse(res, dataUser);
}

exports.Login = async (req, res, next) => {
    const data = await authService.Login(req.body.email, req.body.password);
    SuccessResponse(res, data);
};

exports.GetProfile = async (req, res, next) => {
    const user = req.user;
    delete user.password;
    SuccessResponse(res, user);
};
