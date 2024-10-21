const userRepository = require("../repositories/users");
const jwt = require("jsonwebtoken");
const imageUpload = require("../utils/images-kit");   

exports.Register = async (dataUser, file) => {

    if (file.profile_picture) {
        dataUser.profile_picture = await imageUpload(file.profile_picture);
    }
    //create user
    const user = await userRepository.CreateUser(dataUser);

    //generate token with jwt
    const payload = {
        user_id: user.id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    //don't forget to remove the password object, if not remove it will be displayed in the response
    delete user.password;

    //upload image to imagekit
    

    //return the user info and the token
    return {
        user,
        token,
    }
}

exports.Login = async (dataUser) => {
    const user = await userRepository.GetUserByEmail(
        dataUser.email,
        dataUser.password
    );
    if (!user) {
        throw new NotFoundError("User not found!");
    }
    //saya ingin menampilkan tokennya juga
    const payload = {
        user_id: user.id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    //don't forget to remove the password object, if not remove it will be displayed in the response
    delete user.password;

    //return the user info and the token
    return {
        user,
        token,
    }
}
