const express = require('express'); //import express
require("express-async-errors");
const fs = require('fs'); // sebagai modul untuk mengakses file system
const path = require('path'); // sebagai modul untuk menangani path file
const { z } = require('zod'); // Import Zod
let cars = require('./data/cars.json'); //import students data
const { v4: uuidv4 } = require('uuid');

const app = express(); //create express app
const port = 6000; //set port

app.use(express.json());

//devinisi schema zod untuk validasi input
const carSchema = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    image: z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
})

//standarize response
const successResponse = (res, data) => {
    res.status(200).json({
        success: true,
        data,
    });
};

//error handling
class BadRequestError extends Error {
    constructor(errors) {
        super("Validation failed");
        this.errors = errors;
        this.status = 400;
    }
} 

//path untuk file json
const filePath = path.join(__dirname, 'data', 'cars.json');
const saveFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


app.get('/', (req, res) => {
    successResponse(res, { message: 'Welcome to the Car Rental API' });
});

//get all cars
app.get('/cars', (req, res) => {
    successResponse(res, cars);
});

//get car by id
app.get('/cars/:id', (req, res) => {
    const car = cars.find((car) => car.id === req.params.id);
    if (!car) {
        throw new BadRequestError('Car not found');
    }
    successResponse(res, car);
});

//create car
app.post('/cars', (req, res) => {
    const validateBody = carSchema.safeParse(req.body);
    if (!validateBody.success) {
        throw new BadRequestError(validateBody.error.errors.map(error => error.message));
    }
    const newCar = {
        id: uuidv4(),
        ...validateBody.data,
    };

    cars.push(newCar);

    saveFile(cars);

    successResponse(res, newCar);
});

// update car yang mana akan mengembalikan data yang sudah di update
app.put('/cars/:id', (req,res) => {
    const validateBody = carSchema.safeParse(req.body);
    if (!validateBody.success) {
        throw new BadRequestError(validateBody.error.errors.map(error => error.message));
    }

    const carIndex = cars.findIndex((car) => car.id === req.params.id);
    if (carIndex === -1) {
        throw new BadRequestError('Car not found');
    }

    cars[carIndex] = { 
        ...cars[carIndex], 
        ...validateBody.data 
    };

    saveFile(cars);

    successResponse(res, cars[carIndex]);
});

//delete car yang akan mengembalikan data yang sudah dihapus
app.delete('/cars/:id', (req, res) => {
    const carIndex = cars.findIndex((car) => car.id === req.params.id);
    if (carIndex === -1) {
        throw new BadRequestError('Car not found');
    }

    const deletedCar = cars.splice(carIndex, 1);

    saveFile(cars);

    successResponse(res, deletedCar);
})

//function untuk menangkap error
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const errors = err.errors || [];
    
    let massage = err.message;
    if (status === 500) {
        massage = 'Internal Server Error';
    }   

    res.status(status).json({
        success: false,
        data: null,
        massage,
        errors,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
