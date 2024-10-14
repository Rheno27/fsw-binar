const students = require("../../data/students.json");
const fs = require("fs");
const path = require("path");
const {PrismaClient} = require("@prisma/client")
const JSONBigInt = require("json-bigint");


const prisma = new PrismaClient();

exports.GetStudents = async (name, nickName) => {
    const searchedStudents = await prisma.students.findMany({
        where: {
            OR: [
                { name: { contains: name, mode: "insensitive" } },
                { nickName: { contains: nickName, mode: "insensitive" } },
            ],
        },
        include: {
            classes: true,
            universities: true,
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(searchedStudents);
    return JSONBigInt.parse(serializedStudents);
};

exports.GetStudentById = async (id) => {
    const student = await prisma.students.findUnique({
        where: {
            id: id
        }
    });
    const serializedStudents = JSONBigInt.stringify(student);
    return JSONBigInt.parse(serializedStudents);
}

exports.CreateStudent = async (student) => {
    const newStudent = await prisma.students.create({
        data,
    })
    const serializedStudents = JSONBigInt.stringify(newStudent);
    return JSONBigInt.parse(serializedStudents);
}


exports.DeleteStudentById = (id) => {
    const studentIndex = students.findIndex((student) => student.id == id);
    
    if (studentIndex === -1) {
        return null;
    }

    const deletedStudent = students.splice(studentIndex, 1);

    const filePath = path.join(__dirname, '../../data', 'students.json');
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

    return deletedStudent;
}

exports.UpdateStudentById = (id, dataStudent) => {
    const student = students.find((student) => student.id == id);
    
    if (!student) {
        throw new NotFoundError("Student is Not Found!");
    }
    
    Object.assign(student, dataStudent);

    const filePath = path.join(__dirname, '../../data', 'students.json');
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
    return student;
}
