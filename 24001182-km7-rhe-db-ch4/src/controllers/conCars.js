const serviceCars = require('../services/serCars');
const { SuccessResponse } = require('../utils/response');
const { NotFoundError } = require('../utils/request');

exports.getAllCars = (req, res, next) => {
    const cars = serviceCars.getAllCars(
        req.query?.plate,
        req.query?.manufacture,
        req.query?.model
    );
    SuccessResponse(res, cars);
}

exports.getCarById = (req, res, next) => {
    const car = serviceCars.getCarById(req.params.id);
    if (!car) {
        throw new NotFoundError("Car not found");
    }
    SuccessResponse(res, car);
}

exports.createCar = async (req, res, next) => {
    const newCar = await serviceCars.createCar(
        req.body,
        req.files
    );
    SuccessResponse(res, newCar, 201);
}

exports.updateCar = async (req, res, next) => {
    const updatedCar = await serviceCars.updateCar(
        req.params.id,
        req.body,
        req.files
    );
    if (!updatedCar) {
        throw new NotFoundError("Car not found");
    }
    SuccessResponse(res, updatedCar);
}

exports.deleteCar = (req, res, next) => {
    const deletedCar = serviceCars.deleteCar(req.params.id);
    SuccessResponse(res, deletedCar);
}
