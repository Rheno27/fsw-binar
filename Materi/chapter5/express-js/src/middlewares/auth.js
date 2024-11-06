const {z} = require('zod');
const {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError
} = require('../utils/request');
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users");

exports.authorization =
    (...roles) =>
    async (req, res, next) => {
        // get token from request headers
        const authorizationHeader = req.headers["authorization"];
        if (!authorizationHeader) {
            throw new UnauthorizedError("You need to login in advance!");
        }

        const splittedAuthHeader = authorizationHeader.split(" ");
        if (splittedAuthHeader.length <= 1) {
            throw new UnauthorizedError("Token is not valid!");
        }

        const token = splittedAuthHeader[1];

        // extract the token
        const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

        // get information of the user that has that token
        const user = await userRepository.GetUserById(extractedToken.user_id);

        // validate the role that can be access to the next middleware
        const accessValidation = roles.includes(user.role_id);
        if (!accessValidation) {
            throw new ForbiddenError("You can not access this resource!");
        }

        // pass the user to request, then every middleware can access the user profile without needing to get again in repository level
        req.user = user;

        next();
    };


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
