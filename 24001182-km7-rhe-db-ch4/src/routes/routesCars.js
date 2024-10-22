const express = require('express');

const {
    validateCars,
    validateGetCars
} = require('../middlewares/midelCars');

const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/conCars');

const router = express.Router();

router
    .route('/')
    .get(validateGetCars, getAllCars)
    .post(validateCars, createCar);

router
    .route('/:id')
    .get(getCarById)
    .put(validateCars, updateCar)
    .delete(deleteCar);


module.exports = router;

