const students = [
{
    name: "rheno julius",
    nickname: "rheno",
    class: "FSW-1",
    address: {
        province: "jawa timur",
        city: "jember",
    },
    education: {
        bechelor: "universitas jember"
    },
},
{
    name: "eko indra",
    nickname: "eko",
    class: "FSW-1",
    address: {
        province: "jawa timur",
        city: "surabaya",
    },
    education: {
        bechelor: "upn veteran east java"
    },
},
{
    name: "dhiyaul faruq",
    nickname: "faruq",
    class: "FSW-1",
    address: {
        province: "jawa timur",
        city: "jember",
    },
    education: {
        bechelor: "universitas jember"
    },
},
{
    name: "arswendo erza",
    nickname: "erza",
    class: "FSW-1",
    address: {
        province: "lampung",
        city: "lampung",
    },
    education: {
        bechelor: "universitas lampung"
    },
},
{
    name: "fariq",
    nickname: "fariq",
    class: "FSW-1",
    address: {
        province: "jawa timur",
        city: "jember",
    },
    education: {
        bechelor: "universitas jember"
    },
},
]

// backtick 
// const textwithBacktick = `my name is ${rheno.name}
// , used to called ${rheno.nickname}. Now i am student of ${rheno.education.bechelor}
// i am from ${rheno.address.city}, ${rheno.address.province}`;
// console.log(textwithBacktick);


// console.log(`There are three students, ${students[0].nickname}, ${students[1].nickname}, and ${students[2].nickname}. 
// ${students[0].nickname} is from ${students[0].address.city}, ${students[0].address.province}. 
// ${students[1].nickname} is from ${students[1].address.city}, ${students[1].address.province}.
// ${students[2].nickname} is from ${students[2].address.city}, ${students[2].address.province}.`);

// cara pertama
// for (let index = 0; index < students.length; index++) {
//     const studen = students[index];
//     const describe = `my naem is ${students.name}, used to called ${studen.nickname},
//     i am from ${studen.address.city}`;
//     console.log(describe);
// }

// cara ke2 map
// students.map((students) => {
//     const describe = `my name is ${students.name}, i am student of ${students.education.bechelor}`;
//     console.log(describe);
// })

// cara ke3
// students.forEach(student => {
//     const allstudent = `My name is ${student.name}, used to called ${student.nickname}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bechelor}.`;
//     console.log(allstudent);
// });

// TODO:

// students.map((students) => {
//     if(students.address.province == "jawa timur"){
//         const describe = `my name is ${students.name}, i am student of ${students.education.bechelor}`;
//         console.log(describe);
//     }
// });

// students.filter(student => student.address.province.toLowerCase() === "jawa timur")
//     .map(student => {
//         const describe = `My name is ${student.name}, used to called ${student.nickname}. 
//         I am from ${student.address.city}, ${student.address.province}. 
//         And I am student of ${student.education.bechelor}.`;
//         console.log(describe);
//     });


// ascending
const sortedAscending = students.slice().sort((a, b) => a.name.localeCompare(b.name));
console.log("urutan berdasarkan ascending:");
sortedAscending.forEach(student => console.log(student.name));

// descending
const sortdescending = students.slice().sort((a, b) => b.name.localeCompare(a.name));
console.log("urutan berdasarkan descending:");
sortdescending.forEach(student => console.log(student.name));

// Mengurutkan nama dalam urutan ascending tanpa slice()
students.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});
console.log("Ascending Order:");
students.forEach(student => console.log(student.name));

// Mengurutkan nama dalam urutan descending tanpa slice()
students.sort((a, b) => {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
});
console.log("Descending Order:");
students.forEach(student => console.log(student.name));