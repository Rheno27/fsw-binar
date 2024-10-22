const cars = require('../../data/cars.json');
const fs = require('fs');
const path = require('path');

const saveCars = (cars) => {
    const filePath = path.join(__dirname, '../../data', 'cars.json');
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
}

exports.getAllCars = (plate, manufacture, model) => {
    const lowerCasePlate = plate ? plate.toLowerCase() : "";
    const lowerCaseManufacture = manufacture ? manufacture.toLowerCase() : "";
    const lowerCaseModel = model ? model.toLowerCase() : "";

    const searchedCars = cars.filter((car) => { 
        return car.plate.toLowerCase().includes(lowerCasePlate) &&  
                car.manufacture.toLowerCase().includes(lowerCaseManufacture) &&
                car.model.toLowerCase().includes(lowerCaseModel);
    });

    return searchedCars;
}

exports.getCarById = (id) => {
    const car = cars.find((car) => car.id == id);
    return car;
}

exports.createCar = (newCarData ) => {
    cars.push(newCarData);

    saveCars(cars);

    return newCarData;
}

exports.updateCar = (id, updateCarData) => {
    const carIndex = cars.findIndex((car) => car.id == id);

    // if (!carIndex) {
    //     throw new NotFoundError("Car not found");
    // }

    cars[carIndex] = {
        ...cars[carIndex],
        ...updateCarData
    };

    saveCars(cars);

    return cars[carIndex];
}

exports.deleteCar = (id) => {
    const carIndex = cars.findIndex((car) => car.id == id);
    const deletedCar =  cars.splice(carIndex, 1);

    saveCars(cars);

    return deletedCar;
}