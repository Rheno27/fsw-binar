const {z} = require('zod');
const {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError
} = require('../utils/request');
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users");

exports.authorization = (...roles) => async (req, res, next) => {
    const authorizationHandler = req.headers["authorization"];

    if (!authorizationHandler) {
        throw new UnauthorizedError("Unauthorized");
    }

    const splitAuthorization = authorizationHandler.split(" ");
    if (splitAuthorization.length <= 1) {
        throw new UnauthorizedError("Token not valid!");
    }
    const token = splitAuthorization[1];

    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

    //get info user
    const user = await userRepository.GetUserById(extractedToken.user_id);

    const accessValidation = roles.includes(user.role_id);
    if (!accessValidation) {
        throw new ForbiddenError("You can't access this resource!");
    }

    req.user = user;
    
    next();
}


exports.validateRegister =  (req, res, next) => {
    const validateBody = z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.string(),
    });

    const validateFileBody = z.object({
        profile_picture: z.object({
            name: z.string(),
            data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

    const validate = validateBody.safeParse(req.body);
    if(!validate.success) {
        throw new BadRequestError(validate.error.message);
    }
    const validateFile = validateFileBody.safeParse(req.files);
    if(!validateFile.success) {
        throw new BadRequestError(validateFile.error.message);
    }
    next();
}

exports.validateLogin = (req, res, next) => {
    const validateBody = z.object({
        email: z.string().email(),
        password: z.string(),
    });
    const validate = validateBody.safeParse(req.body);
    if(!validate.success) {
        throw new BadRequestError(validate.error.message);
    }
    next();
}
