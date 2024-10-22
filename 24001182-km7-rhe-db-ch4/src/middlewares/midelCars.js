const { z } = require('zod');
const { BadRequestError } = require('../utils/request'); 

exports.validateCars = (req, res, next) => {
    const validateBody = z.object({
        plate: z.string(),
        manufacture: z.string(),
        model: z.string(),
        rentPerDay: z
            .string()
            .transform(val => Number(val))
            .refine(val => !isNaN(val)),
        capacity: z
            .string()
            .transform(val => Number(val))
            .refine(val => !isNaN(val)),
        description: z.string(),
        availableAt: z.string(),
        transmission: z.string(),
        available: z
            .string()
            .transform(val => val === 'true' || val === 'false' ? Boolean(val === 'true') : Boolean(val)), // Konversi string ke boolean
        type: z.string(),
        year: z
            .string()
            .transform(val => Number(val))
            .refine(val => !isNaN(val)),
        options: z
            .union([
                z.string().transform(str => str.split(',').map(item => item.trim())),
                z.array(z.string().transform(item => item.trim()))
            ])
            .optional(),
        specs: z
            .union([
                z.string().transform(str => str.split(',').map(item => item.trim())),
                z.array(z.string().transform(item => item.trim()))
            ])
            .optional(),
    });

    const validateImageFile = z.object({
        image: z.any(),
    }).nullable().optional();

    // Validasi body
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    // Assign hasil transformasi yang valid ke req.body
    req.body = result.data;

    // Validasi file image jika ada
    const resultValidateImageFile = validateImageFile.safeParse(req.files);
    if (!resultValidateImageFile.success) {
        throw new BadRequestError(resultValidateImageFile.error.errors);
    }

    // Lanjutkan ke middleware berikutnya jika validasi sukses
    next();
};

exports.validateGetCars = (req, res, next) => {
    const validateQuery = z.object({
        plate: z.string().optional(),
        manufacture: z.string().optional(),
        model: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
}
