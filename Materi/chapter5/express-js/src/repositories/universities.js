const {PrismaClient} = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.GetUniversities = async () => {
    const universities = await prisma.universities.findMany();
    const serializedUniversities = JSONBigInt.stringify(universities);
    return JSONBigInt.parse(serializedUniversities);
}

