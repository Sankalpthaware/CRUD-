const form = document.getElementById('crud-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const tableBody = document.getElementById('table-body');

let editIndex = null;
let data = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name && email) {
    if (editIndex === null) {
      data.push({ name, email }); // Add
    } else {
      data[editIndex] = { name, email }; // Update
      editIndex = null;
    }

    renderTable();
    form.reset();
  }
});

function renderTable() {
  tableBody.innerHTML = '';
  data.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>
        <button class="edit" onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editItem(index) {
  const item = data[index];
  nameInput.value = item.name;
  emailInput.value = item.email;
  editIndex = index;
}

function deleteItem(index) {
  data.splice(index, 1);
  renderTable();
}
