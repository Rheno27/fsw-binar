require('dotenv').config();
const express = require('express'); //import express
require("express-async-errors");
const router = require('./routes');
const fileUpload = require('express-fileupload');
const { errorHandler, notFoundURLHandler } = require('./middlewares/errors');

const app = express(); //create express app
const port = 6000; //set port

app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
}));

app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Ping Success!"
    });
});

app.use("*",notFoundURLHandler);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
