const universityRepository = require("../repositories/universities");

exports.GetUniversities = async () => {
    return universityRepository.GetUniversities();
}