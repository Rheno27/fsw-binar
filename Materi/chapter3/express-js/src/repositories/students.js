const students = require("../../data/students.json");
const fs = require("fs");
const path = require("path");

exports.GetStudents = (name, nickname) => {
    //search student by name and nickname
    const lowerCaseName = name ? name.toLowerCase() : "";
    const lowerCaseNickname = nickname ? nickname.toLowerCase() : "";

    const searchedStudents = students.filter((student) => {
        return student.name.toLowerCase().includes(lowerCaseName) &&
                student.nickname.toLowerCase().includes(lowerCaseNickname);
    });
    return searchedStudents;
}

exports.GetStudentById = (id) => {
    const student = students.find((student) => student.id == id);
    return student;
}

exports.CreateStudent = (student) => {
    const maxId = students.reduce((max, student) => Math.max(max, student.id), 0);

    const newStudent = {
        id: maxId + 1,
        ...student
    };

    students.push(newStudent);

    const filePath = path.join(__dirname, '../../data', 'students.json');
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2),);

    return newStudent;
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
