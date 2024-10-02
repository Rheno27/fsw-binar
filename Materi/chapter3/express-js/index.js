const express = require('express'); //import express
const fs = require('fs'); // sebagai modul untuk mengakses file system
const path = require('path'); // sebagai modul untuk menangani path file
const { z } = require('zod'); // Import Zod
let students = require('./data/students.json'); //import students data


const app = express(); //create express app
const port = 3000; //set port

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
    try {
        // Validasi input menggunakan Zod
        const validatedData = studentSchema.parse(req.body);

        const newStudent = {
            id: students.length + 1,
            ...validatedData
        };

        students.push(newStudent);

        // Tulis kembali file students.json dengan data yang diperbarui
        const filePath = path.join(__dirname, 'data', 'students.json');
        fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error saving student data' });
            }
            res.status(201).json(newStudent);
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Jika ada error validasi, kirim pesan error
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
            });
        }
        // Untuk error lainnya
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const student = students.find((student) => student.id == id);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    try {
        // Validasi input menggunakan Zod
        const validatedData = studentSchema.parse(req.body);

        // Update data siswa
        Object.assign(student, validatedData);

        // Tulis kembali file students.json
        const filePath = path.join(__dirname, 'data', 'students.json');
        fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error saving student data' });
            }
            res.status(200).json(student);
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Jika ada error validasi, kirim pesan error
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
            });
        }
        // Untuk error lainnya
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const student = students.find((student) => student.id == id);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    const filePath = path.join(__dirname, 'data', 'students.json');
    const newStudents = students.filter((student) => student.id != id);
    fs.writeFile(filePath, JSON.stringify(newStudents, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ message: 'Error saving student data' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    });
});

// Run the express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});