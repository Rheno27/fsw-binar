const studentRepository = require("../repositories/students");
const { NotFoundError } = require("../utils/request");
const { imageUpload } = require("../utils/images-kit");

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

exports.CreateStudent = async (student, file) => {
    //upload file to imagekit
    if (file?.profilePicture) {
        student.profilePicture = await imageUpload(file.profilePicture);
    }
    return studentRepository.CreateStudent(student);
}

exports.DeleteStudentById = async (id) => {
    const student = studentRepository.GetStudentById(id);
    if (!student) {
        throw new NotFoundError("Student is Not Found!");
    }
    if (student.profilePictureId) {
        await imageDelete(student.profilePictureId);
    }
    return studentRepository.DeleteStudentById(id);
}

exports.UpdateStudentById = async (id, dataStudent, file) => {
    const existingStudent = studentRepository.GetStudentById(id);
    if (!existingStudent) {
        throw new NotFoundError("Student is Not Found!");
    }

    data = {
        ...existingStudent,
        ...dataStudent
    }

    if (file?.profilePicture) {
        data.profilePicture = await imageUpload(file.profilePicture);
    }   

    const updatedStudent = studentRepository.UpdateStudentById(id, data);
    if (!updatedStudent) {
        throw new InternalServerError("Failed to update student!");
    }
    return updatedStudent;
}

