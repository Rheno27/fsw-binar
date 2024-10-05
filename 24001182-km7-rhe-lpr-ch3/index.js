const express = require('express'); //import express
// require("express-async-errors");
const fs = require('fs'); // sebagai modul untuk mengakses file system
const path = require('path'); // sebagai modul untuk menangani path file
const { z } = require('zod'); // Import Zod
let cars = require('./data/cars.json'); //import students data
const { v4: uuidv4 } = require('uuid');

const app = express(); //create express app
const port = 6000; //set port

app.use(express.json());

app.get('/cars', (req, res) => {
    const validateQuery = z.object({
        plate: z.string().optional(),
        manufacture: z.string().optional(),
        model: z.string().optional(),
        image: z.string().optional(),
        rentPerDay: z.number().optional(),
        capacity: z.number().optional(),
        description: z.string().optional(),
        availableAt: z.string().optional(),
        transmission: z.string().optional(),
        available: z.boolean().optional(),
    });

    const resultvalidateQuery = validateQuery.safeParse(req.query);
    if (!resultvalidateQuery.success) {
        res.status(400).json({ success: false, message: resultvalidateQuery.error.errors.map(error => error.message) });
    }

    const { model } = resultvalidateQuery.data;

    const filteredCars = cars.filter((car) => {
        return (
            (!model || car.model
                .toLowerCase()
                .includes(model.toLowerCase()))
        );
    });

    res.status(200).json({ success: true, data: filteredCars });
});

app.post('/cars', (req, res) => {
    const validateBody = z.object({
        plate: z.string(),
        manufacture: z.string(),
        
    });

    const validatedData = validateBody.parse(req.body);

    const newCar = {
        id: uuidv4(),
        ...validatedData,
    };

    cars.push(newCar);

    const filePath = path.join(__dirname, 'data', 'cars.json');
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));


    res.status(201).json({ success: true, data: newCar });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
