const userRepository = require("../repositories/users");
const jwt = require("jsonwebtoken");
const {imageUpload} = require("../utils/images-kit");   
const bcrypt = require("bcrypt");
const { UnauthorizedError} = require("../utils/request");



exports.Register = async (dataUser, file) => {

    if (file.profile_picture) {
        dataUser.profile_picture = await imageUpload(file.profile_picture);
    }
    //create user
    const user = await userRepository.CreateUser(dataUser);

    //generate token with jwt
    const token = createToken(user.id);

    //don't forget to remove the password object, if not remove it will be displayed in the response
    delete user.password;

    //upload image to imagekit
    

    //return the user info and the token
    return {
        user,
        token,
    }
}

exports.Login = async (email, password) => {
    const user = await userRepository.GetUserByEmail(
        email,
    );
    if (!user) {
        throw new UnauthorizedError("User not found!");
    }

    // Check if user.password exists before comparing
    if (!user.password) {
        throw new UnauthorizedError("User password is not set!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid password!");
    }
    //saya ingin menampilkan tokennya juga
    const token = createToken(user.id);
    //don't forget to remove the password object, if not remove it will be displayed in the response
    delete user.password;

    //return the user info and the token
    return {
        user,
        token,
    }
}

const createToken = (user) => {
    // generate token with jwt
    const payload = {
        user_id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "72h", // expired in 3 days
    });

    return token;
};
