const {z} = require('zod');
const {BadRequestError} = require('../utils/request');

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
