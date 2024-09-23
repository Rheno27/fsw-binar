// import students.json

import students from '../data/students.json' with { type: "json"};
// console.log(students);

const studentContent = document.getElementById("student-content");

let studentContentHTML = ""
students.map(student => {
    const studentContent = `
    <div class="col-md-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${student.name}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                    ${student.education.bachelor}
                </h6>
                <p class="card-text">
                    Nama saya ${student.name}, biasa dipanggil ${student.nickname},
                    saya berasal dari ${student.address.city}, ${student.address.province}.
                    dan saya mahasiswa dari ${student.education.bachelor}.
                </p>
            </div>
        </div>
    </div>
    `; 
    studentContentHTML += studentContent;
    console.log(studentContentHTML);
});
studentContent.innerHTML = "<h1>Loading...</h1>";

setTimeout(() => {
    studentContent.innerHTML = studentContentHTML;
}, 2000);

//end show all students


// start to search

const search = document.getElementById("search");

search.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    console.log(e.target.value);
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(query) || 
        student.education.bachelor.toLowerCase().includes(query)
    );

    let filteredContentHTML = "";
    filteredStudents.map(student => {
        const studentContent = `
        <div class="col-md-3">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${student.name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                        ${student.education.bachelor}
                    </h6>
                    <p class="card-text">
                        Nama saya ${student.name}, biasa dipanggil ${student.nickname},
                        saya berasal dari ${student.address.city}, ${student.address.province}.
                        dan saya mahasiswa dari ${student.education.bachelor}.
                    </p>
                </div>
            </div>
        </div>
        `; 
        filteredContentHTML += studentContent;
    });

    studentContent.innerHTML = "<h1>Loading...</h1>";

    setTimeout(() => {
        if (filteredContentHTML === ""){
            studentContent.innerHTML = "<h1>Data Tidak Ditemukan</h1>";
        } else {
            studentContent.innerHTML = filteredContentHTML;
        }
    },1000);
});

// end search
