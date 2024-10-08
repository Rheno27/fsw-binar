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

exports.ValidateGetStudentById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    next();
}

exports.ValidateCreateStudent = (req, res, next) => {
    const validateBody = z.object({
        name: z.string(),
        nickname: z.string().optional(),
        kelas: z.string().optional(),
        address: z.object({
            province: z.string().optional(),
            city: z.string().optional(),
        }),
        education: z.object({
            bachelor: z.string().optional(),
        }),
    });
    
    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    next();
}

exports.ValidateDeleteStudentById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    next();
}

exports.ValidateUpdateStudentById = (req, res, next) => {
    const validateBody = z.object({
        name: z.string().optional(),
        nickname: z.string().optional(),
        kelas: z.string().optional(),
        address: z.object({
            province: z.string().optional(),
            city: z.string().optional(),
        }),
        education: z.object({
            bachelor: z.string().optional(),
        }),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    next();
}


