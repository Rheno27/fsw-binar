const studentRepository = require("../repositories/students");
const { NotFoundError } = require("../utils/request");
const { imageUpload, imageDelete } = require("../utils/images-kit");

exports.GetStudents = (name, nickname) => {
    return studentRepository.GetStudents(name, nickname);
};

exports.GetStudentById = async(id) => {
    const student = await studentRepository.GetStudentById(id);
    if (!student) {
        throw new NotFoundError("Student is Not Found!");
    }
    return student;
}

exports.CreateStudent = async (dataStudent, file) => {
    //upload file to imagekit
    if (file?.profile_picture) {
        dataStudent.profile_picture = await imageUpload(file.profile_picture);
    }
    return studentRepository.CreateStudent(dataStudent);
}

exports.DeleteStudentById = async (id) => {
    const student = await studentRepository.GetStudentById(id);
    if (!student) {
        throw new NotFoundError("Student is Not Found!");
    }
    return studentRepository.DeleteStudentById(id);
}

// update
exports.UpdateStudentById = async (id, data, file) => {
    
    const existingStudent = await studentRepository.GetStudentById(id);
    if (!existingStudent) {
        throw new NotFoundError("Student is Not Found!");
    }

    data = {
        ...existingStudent,
        ...data
    }

    if (file?.profile_picture) {
        
        data.profile_picture = await imageUpload(file.profile_picture);
    }   

    const updatedStudent = await studentRepository.UpdateStudentById(id, data);
    if (!updatedStudent) {
        throw new InternalServerError("Failed to update student!");
    }
    return updatedStudent;
}

