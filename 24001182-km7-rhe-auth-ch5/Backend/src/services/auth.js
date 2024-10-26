const repoUsers = require('../repositories/users');
const jwt = require('jsonwebtoken');
const { imageUpload } = require('../utils/images-kit');
const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../utils/request');


exports.Register = async (dataUser, file) => {

    if (file.profile_picture) {
        dataUser.profile_picture = await imageUpload(file.profile_picture);
    }

    const user = await repoUsers.CreateUser(dataUser);

    const token = createToken(user);

    delete user.password;

    return {
        user,
        token,
    };
}

exports.Login = async (email, password) => {
    const user = await repoUsers.GetUserByEmail(
        email
    );
    if(!user) {
        throw new UnauthorizedError('User not found!');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid password!');
    }
    const token = createToken(user);
    delete user.password;
    return {
        user,
        token,
    };
}

const createToken = (user) => {
    // generate token with jwt
    const payload = {
        user_id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h", // expired in 1 hour
    });

    return token;
};

