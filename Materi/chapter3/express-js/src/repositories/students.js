const students = require("../../data/students.json");

exports.GetStudents = (name, nickname) => {
    //search student by name and nickname
    const searchedStudents = students.filter((student) => {
        return student.name.toLowerCase().includes(name.toLowerCase()) &&
                student.nickname.toLowerCase().includes(nickname.toLowerCase());
    });
    return searchedStudents;
}

