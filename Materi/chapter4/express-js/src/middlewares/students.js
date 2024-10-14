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
        nickName: z.string(),
        classes: z.string(),
        universities: z.string(),
    });

    // The file is not required
    const ValidateFileBody = z
        .object({
            profilePicture: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .nullable()
                .optional(),
        })
        .nullable()
        .optional();

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    const resultValidateFileBody = ValidateFileBody.safeParse(req.files);
    if (!resultValidateFileBody.success) {
        throw new BadRequestError(resultValidateFileBody.error.errors);
    }

    next();
};

//delete student by id with file image
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
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    const validateBody = z.object({
        name: z.string().optional(),
        nickname: z.string().optional(),
        kelas: z.string().optional(),
        "address.province": z.string().optional(),
        "address.city": z.string().optional(),
        "education.bachelor": z.string().nullable().optional(),
    });

    const ValidateFileBody = z
        .object({
            profilePicture: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .nullable()
                .optional(),
        })
        .nullable()
        .optional();

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    const resultValidateFileBody = ValidateFileBody.safeParse(req.files);
    if (!resultValidateFileBody.success) {
        throw new BadRequestError(resultValidateFileBody.error.errors);
    }

    next();
}


