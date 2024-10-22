const repoCars = require('../repositories/repoCars');
const { imageUpload } = require('../utils/images-kit.js');
const { v4: uuidv4 } = require('uuid');

const getAllCars = (plate, manufacture, model) => {
    return repoCars.getAllCars(plate, manufacture, model);
}

const getCarById = (id) => {
    const car = repoCars.getCarById(id);
    if (!car) {
        throw new NotFoundError("Car not found");
    }
    return car;
}

const createCar = async (newCar, imageFile) => {
    const newCarData = {
        id: uuidv4(),
        ...newCar,
    }
    if (imageFile?.image) {
        newCarData.image = await imageUpload(imageFile.image);
    }
    
    return repoCars.createCar(newCarData);
}

const updateCar = async (id, updateCar, imageFile) => {
    const car = repoCars.getCarById(id);
    if (!car) {
        throw new NotFoundError("Car not found");
    }

    const updateCarData = repoCars.updateCar(id, updateCar);  
    if (imageFile?.image) {
        updateCarData.image = await imageUpload(imageFile.image);
    }
    return updateCarData;
}

const deleteCar = (id) => {
    return repoCars.deleteCar(id);
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}

