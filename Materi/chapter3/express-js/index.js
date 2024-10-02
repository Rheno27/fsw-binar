const express = require('express'); //import express
const fs = require('fs'); // sebagai modul untuk mengakses file system
const path = require('path'); // sebagai modul untuk menangani path file
let students = require('./data/students.json'); //import students data

const app = express(); //create express app
const port = 3000; //set port

// Add middleware to parse JSON request bodies
app.use(express.json());

//create route for home page
app.get('/', (req, res) => {
    res.send('ping successfully');
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

app.post('/students', (req, res) => {
    const { name, nickname, kelas, address, education } = req.body;
    if(!name || name == ""){
        res.status(400).json({
            message: 'Name is required'
        });
        return;
    }
    if(!nickname || nickname == ""){
        res.status(400).json({
            message: 'Nickname is required'
        });
        return;
    }
    if(!kelas || kelas == ""){
        res.status(400).json({
            message: 'Kelas is required'
        });
        return;
    }
    if(!address){
        res.status(400).json({
            message: 'Address is required'
        });
        return;
    }
    if(!education){
        res.status(400).json({
            message: 'Education is required'
        });
        return;
    }
    
    const { province, city } = address;
    if (!province ) {
        res.status(400).json({
            message: 'Province is required'
        });
        return;
    }
    if (!city ) {
        res.status(400).json({
            message: 'City is required'
        });
        return;
    }
    const { bachelor } = education;
    if (!bachelor ) {
        res.status(400).json({
            message: 'Bachelor is required'
        });
        return;
    }

    const newStudent = {
        id: students.length + 1,
        name,
        nickname,
        kelas,
        address : {
            province,
            city
        },  
        education : {
            bachelor
        }
    };

    students.push(newStudent);

    //membuat file students.json dengan data yang diperbarui
    const filePath = path.join(__dirname, 'data', 'students.json');//menggunakan path untuk menentukan lokasi file
    fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => { //menulis file students.json dengan data yang diperbarui
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).json({ message: 'Error saving student data' });
        } else {
            res.status(201).json(newStudent);
        }
    });
});

// Run the express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});