const studentRepository = require("../repositories/students");

exports.GetStudents = (name, nickname) => {
    return studentRepository.GetStudents(name, nickname);
}

