document.addEventListener("DOMContentLoaded", function () {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      department: "Engineering",
      role: { title: "Frontend Developer", level: "Mid" },
      contact: { email: "john.doe@example.com", phone: "123-456-7890" },
      skills: ["JavaScript", "React", "CSS"],
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      department: "Design",
      role: { title: "UI/UX Designer", level: "Senior" },
      contact: { email: "jane.smith@example.com", phone: "098-765-4321" },
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    
  ];

  populateTable(employees);
});



function populateTable(employees) {
  
  if (!employees || employees.length === 0) {
    console.error('No employee data available.');
    return;
  }


  const tableBody = document
    .getElementById("employeesTable")
    .getElementsByTagName("tbody")[0];

  employees.forEach((employee) => {
    const row = document.createElement("tr");

    row.appendChild(createCell(employee.id ?? 'N/A'));
    row.appendChild(createCell(employee.name ?? 'N/A'));
    row.appendChild(createCell(employee.age ?? 'N/A'));
    row.appendChild(createCell(employee.department ?? 'N/A'));
    row.appendChild(createCell(employee.role?.title ?? 'N/A'));
    row.appendChild(createCell(employee.role?.level ?? 'N/A'));
    row.appendChild(createCell(employee.contact?.email ?? 'N/A'));
    row.appendChild(createCell(employee.contact?.phone ?? 'N/A'));
    row.appendChild(createCell((employee.skills?.join(', ')) ?? 'N/A'));

    tableBody.appendChild(row);
  });
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}