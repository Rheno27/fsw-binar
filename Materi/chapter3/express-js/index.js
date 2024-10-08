const express = require('express'); //import express
require("express-async-errors");
const router = require("./src/routes")

const app = express(); //create express app
const port = 3000; //set port

// Add middleware to parse JSON request bodies
app.use(express.json());
 //create route for home page
app.get('/', (req, res) => {
    res.send('ping successfully');
});

//create route for students page
app.use('/',router);


// function untuk menangkap error
// app.use((err, req, res, next) => {
//     const status = err.status || 500;
//     const errors = err.errors || [];
    
    
//     let massage = err.message;
//     if (status === 500) {
//         massage = 'Internal Server Error';
//     }

//     res.status(status).json({
//         success: false,
//         data: null,
//         massage,
//         errors,
//     });
// });
// Run the express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});