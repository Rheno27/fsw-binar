const studentRepository = require("../repositories/students");
const { NotFoundError } = require("../utils/request");

exports.GetStudents = (name, nickname) => {
    return studentRepository.GetStudents(name, nickname);
};

exports.GetStudentById = (id) => {
    const student = studentRepository.GetStudentById(id);
    if (!student) {
        throw new NotFoundError("Student is Not Found!");
    }
    return student;
}

exports.CreateStudent = (body) => {
    return studentRepository.CreateStudent(body);
}

exports.DeleteStudentById = (id) => {
    return studentRepository.DeleteStudentById(id);
}

exports.UpdateStudentById = (id, dataStudent) => {
    return studentRepository.UpdateStudentById(id, dataStudent);
}

