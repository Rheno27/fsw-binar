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

exports.GetUserByEmail = async (email, password) => {
    let query = {};

    let orQuery = [];
    if (email) {
        orQuery.push({
            email: {contains: email, mode: "insensitive"},
        });
    }
    if (password) {
        orQuery.push({
            password: {contains: password, mode: "insensitive"},
        });
    }
    if (orQuery.length > 0) {
        query.where = {
            ...query.where,
            OR: orQuery,
        };
    }
    const searchedUser = await prisma.users.findFirst(query);
    const serializedUsers = JSONBigInt.stringify(searchedUser);
    return JSONBigInt.parse(serializedUsers);
}
