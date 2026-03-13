let students = [];
function addStudent() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let math = parseInt(document.getElementById("math").value);
    let science = parseInt(document.getElementById("science").value);
    let english = parseInt(document.getElementById("english").value);

    if (!name || !roll || isNaN(math) || isNaN(science) || isNaN(english)) {
        alert("Please fill all fields correctly!");
        return;
    }

    let student = {
        name: name,
        roll: roll,
        marks: {
            math: math,
            science: science,
            english: english
        }
    };

    students.push(student);
    alert("Student added successfully!");
    clearInputs();
}
function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("math").value = "";
    document.getElementById("science").value = "";
    document.getElementById("english").value = "";
}
function displayStudents() {
    let output = "<h3>All Students</h3>";
    for (let student of students) {
        output += `<p>${student.roll} - ${student.name} | Math: ${student.marks.math}, Science: ${student.marks.science}, English: ${student.marks.english}</p>`;
    }
    document.getElementById("result").innerHTML = output;
}
function calculateResults() {
    let output = "<h3>Results</h3>";
    for (let student of students) {
        let total = student.marks.math + student.marks.science + student.marks.english;
        let avg = total / 3;
        output += `<p>${student.name} (Roll: ${student.roll}) → Total: ${total}, Average: ${avg.toFixed(2)}</p>`;
    }
    document.getElementById("result").innerHTML = output;
}
function showAbove80() {
    let output = "<h3>Students Above 80 Avg</h3>";
    for (let student of students) {
        let avg = (student.marks.math + student.marks.science + student.marks.english) / 3;
        if (avg > 80) {
            output += `<p>${student.name} (Roll: ${student.roll}) → Average: ${avg.toFixed(2)}</p>`;
        }
    }
    document.getElementById("result").innerHTML = output;
}
function showFailed() {
    let output = "<h3>Failed Students</h3>";
    for (let student of students) {
        let avg = (student.marks.math + student.marks.science + student.marks.english) / 3;
        if (avg < 40) {
            output += `<p>${student.name} (Roll: ${student.roll}) → Average: ${avg.toFixed(2)}</p>`;
        }
    }
    document.getElementById("result").innerHTML = output;
}
function countStudents() {
    document.getElementById("result").innerHTML = `<h3>Total Students: ${students.length}</h3>`;
}