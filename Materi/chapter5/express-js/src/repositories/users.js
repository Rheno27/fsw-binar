const {PrismaClient} = require("@prisma/client")
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");


const prisma = new PrismaClient();

exports.CreateUser = async (dataUser) => {
    const saltRounds = 10;
    dataUser.password = await bcrypt.hash(dataUser.password, saltRounds);
    const newUser = await prisma.users.create({
        data: dataUser,
    });

    const serializedUsers = JSONBigInt.stringify(newUser);
    return JSONBigInt.parse(serializedUsers);
}

exports.GetUserByEmail = async (email) => {
    const query = {
        where: {
            email: email,
        },
    };
    const searchedUser = await prisma.users.findFirst(query);
    const serializedUsers = JSONBigInt.stringify(searchedUser);
    return JSONBigInt.parse(serializedUsers);
}

exports.GetUserById = async (id) => {
    const query = {
        where: {
            id: id,
        },
    };
    const searchedUser = await prisma.users.findFirst(query);
    const serializedUsers = JSONBigInt.stringify(searchedUser);
    return JSONBigInt.parse(serializedUsers);
}
