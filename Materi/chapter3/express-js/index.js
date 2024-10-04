const express = require('express'); //import express
require("express-async-errors");
const fs = require('fs'); // sebagai modul untuk mengakses file system
const path = require('path'); // sebagai modul untuk menangani path file
const { z } = require('zod'); // Import Zod
let students = require('./data/students.json'); //import students data


const app = express(); //create express app
const port = 3000; //set port

//standarize response
const successResponse = (res, data) => {
    res.status(200).json({
        success: true,
        data,
    });
};

class BadRequestError extends Error {
    constructor(errors) {
        super("Validation failed");
        this.errors = errors;
        this.status = 400;
    }
}


// Definisikan schema Zod untuk validasi input
const studentSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    nickname: z.string().min(1, { message: "Nickname is required" }),
    kelas: z.string().min(1, { message: "Kelas is required" }),
    address: z.object({
        province: z.string().min(1, { message: "Province is required" }),
        city: z.string().min(1, { message: "City is required" })
    }),
    education: z.object({
        bachelor: z.string().min(1, { message: "Bachelor is required" })
    })
});

// Add middleware to parse JSON request bodies
app.use(express.json());

//create route for home page
app.get('/', (req, res) => {
    res.send('ping successfully');
});

//create route for students page
app.get('/students', (req, res, next) => {
    
        const validateQuery = z.object({
            name: z.string().optional(),
        nickname: z.string().optional(),
    });


    const resultvalidateQuery = validateQuery.safeParse(req.query);
    if (!resultvalidateQuery.success) {
        throw new BadRequestError(resultvalidateQuery.error.errors.map);
    }
    
    //search student by name and nickname
    const { name, nickname } = req.query;
    const searchedStudents = students.filter((student) => {
        return student.name.toLowerCase().includes(name.toLowerCase()) &&
                student.nickname.toLowerCase().includes(nickname.toLowerCase());
    });

    successResponse(res, searchedStudents);
});

//create route for students page with id
app.get('/students/:id', (req, res) => { 
    //get id from params
    const { id } = req.params; 

    //find student by id
    const student = students.find((student) => student.id == id);
    //if student has been found, it will be response the student data
    if (student) {
        successResponse(res, student);
        return; 
    }

    //if student not found, it will be response with status 404
    throw new BadRequestError();
});

app.post('/students', (req, res) => {
    
    // Validasi input menggunakan Zod
    const validatedData = studentSchema.parse(req.body);

    const maxId = students.reduce((max, student) => Math.max(max, student.id), 0);
    newStudent.id = maxId + 1;
        
    const newStudent = {
            id: students.length + 1,
            ...validatedData
        };

        students.push(newStudent);

        // Tulis kembali file students.json dengan data yang diperbarui
        const filePath = path.join(__dirname, 'data', 'students.json');
        fs.writeFileSync(filePath, JSON.stringify(students, null, 2),);
    successResponse(res, newStudent);
});

app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const student = students.find((student) => student.id == id);
    if (!student) {
        throw new BadRequestError();
    }

        // Validasi input menggunakan Zod
        const validatedData = studentSchema.parse(req.body);

        // Update data siswa
        Object.assign(student, validatedData);

        // Tulis kembali file students.json
    const filePath = path.join(__dirname, 'data', 'students.json');
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
    successResponse(res, student);
});

//delete student mengguanak splice dan fs
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex((student) => student.id == id);
    if (studentIndex === -1) {
        throw new BadRequestError();
    }
    
    students.splice(studentIndex, 1);

    const filePath = path.join(__dirname, 'data', 'students.json');
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
    successResponse(res, { message: 'Student deleted successfully' });
});

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
// Run the express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});