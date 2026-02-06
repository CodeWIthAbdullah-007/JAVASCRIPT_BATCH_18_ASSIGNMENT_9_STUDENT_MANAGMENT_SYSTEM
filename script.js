let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const errorMsg = document.getElementById("errorMsg");
const totalStudents = document.getElementById("totalStudents");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const marks = document.getElementById("marks").value.trim();

  if (!name || !age || !marks) {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  if (age < 18) {
    errorMsg.textContent = "Students under 18 are not allowed.";
    return;
  }

  errorMsg.textContent = "";

  let result = "";
  let color = "";

  if (marks >= 80) {
    result = "Distinction";
    color = "green";
  } else if (marks >= 60) {
    result = "Pass";
    color = "blue";
  } else if (marks >= 40) {
    result = "Average";
    color = "yellow";
  } else {
    result = "Fail";
    color = "red";
  }

  const student = { name, age, marks, result, color };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderStudents();
});

function renderStudents() {
  table.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.marks}</td>
      <td><span class="badge ${student.color}">${student.result}</span></td>
      <td>
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });

  totalStudents.textContent = `Total Students: ${students.length}`;
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("marks").value = student.marks;

  editIndex = index;
}

renderStudents();
