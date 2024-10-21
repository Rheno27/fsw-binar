const {PrismaClient} = require("@prisma/client")
const JSONBigInt = require("json-bigint");


const prisma = new PrismaClient();

exports.GetStudents = async (name, nick_name) => {
        let query = {
            include: {
                classes: true,
                universities: true,
            },
        };
    
        // It will generate the query
        let orQuery = [];
        if (name) {
            orQuery.push({
                name: { contains: name, mode: "insensitive" },
            });
        }
        if (nick_name) {
            orQuery.push({
                nick_name: { contains: nickName, mode: "insensitive" },
            });
        }
        if (orQuery.length > 0) {
            query.where = {
                ...query.where,
                OR: orQuery,
            };
        }
    
        // Find by query
    const searchedStudents = await prisma.students.findMany(query);


    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(searchedStudents);
    return JSONBigInt.parse(serializedStudents);
};

exports.GetStudentById = async (id) => {
    const student = await prisma.students.findUnique({
        where: {
            id: id
        }
    });
    const serializedStudents = JSONBigInt.stringify(student);
    return JSONBigInt.parse(serializedStudents);
}

exports.CreateStudent = async (dataStudent) => {
    const newStudent = await prisma.students.create({
        data: dataStudent,
        include: {
            classes: true,
            universities: true,
        },
    });

    const serializedStudents = JSONBigInt.stringify(newStudent);
    return JSONBigInt.parse(serializedStudents);
}

// update student by id use prisma
exports.UpdateStudentById = async (id, data) => {
    
    const updatedStudent = await prisma.students.update({
        where: {
            id: id
        },
        include: {
            classes: true,
            universities: true,
        },
        data,
    });
    
    const serializedStudents = JSONBigInt.stringify(updatedStudent);
    return JSONBigInt.parse(serializedStudents);
}

//delete struden by id use prisma
exports.DeleteStudentById = async (id) => {
    // If student exists, proceed with deletion
    const deletedStudent = await prisma.students.delete({
        where: { 
            id: id 
        },
        include: {
            classes: true,
            universities: true,
        },
    });

    const serializedStudents = JSONBigInt.stringify(deletedStudent);
    return JSONBigInt.parse(serializedStudents);
}