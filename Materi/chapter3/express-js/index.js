const express = require('express'); //import express
const students = require('./data/students.json'); //import students data

const app = express(); //create express app
const port = 3000; //set port

//create route for home page
app.get('/', (req, res) => {
    res.send('Hello World, this is my first express js');
});

//create route for students page
app.get('/students', (req, res) => {
    res.json(students);
});

//create route for students page with id
app.get('/students/:id', (req, res) => { 
    //get id from params
    const { id } = req.params; 

    //find student by id
    const student = students.find((student) => student.id == id);
    //if student has been found, it will be response the student data
    if (student) {
        res.json(student);
        return; 
    }

    //if student not found, it will be response with status 404
    res.status(404).json({
        message: 'Student not found'
    });
});

// Run the express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});