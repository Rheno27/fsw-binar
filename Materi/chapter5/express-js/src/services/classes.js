const classRepository = require("../repositories/classes");

exports.GetClasses = async () => {
    return classRepository.GetClasses();
}