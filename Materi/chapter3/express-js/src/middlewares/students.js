const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.ValidateGetStudents = (req, res, next) => {
    const validateQuery = z.object({
        name: z.string().optional(),
        nickname: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        //if validation failed, it will be throw new BadRequestError
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
}


