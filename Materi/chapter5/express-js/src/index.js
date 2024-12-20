require("dotenv").config();
const express = require('express'); //import express
require("express-async-errors");
const router = require("./routes")
const fileUpload = require("express-fileupload")
const cors = require("cors");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");


const app = express(); //create express app
const port = process.env.PORT || 3000; //set port

// Add middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

//we need to read form-body (body parser/reader) (req.files) if you want upload file
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    })
);


//create route for students page
app.use('/',router);

// This function is for 404 handle URL
app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);

// Run the express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});