const {PrismaClient} = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.GetClasses = async () => {
    const classes = await prisma.classes.findMany();
    const serializedClasses = JSONBigInt.stringify(classes);
    return JSONBigInt.parse(serializedClasses);
}