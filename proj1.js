const API = 'http://localhost:3000';

function showTab(tabName) {
  document.querySelector('.front-page').classList.add('d-none');
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('d-none');
  });
  document.getElementById(tabName).classList.remove('d-none');
  if (tabName === 'employee') loadEmployees();
  if (tabName === 'department') loadDepartments();
  if (tabName === 'salary') loadSalaries();
  if (tabName === 'designation') loadDesignations();
  if (tabName === 'attendance') loadAttendances();
}

function goHome() {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('d-none');
  });
  document.querySelector('.front-page').classList.remove('d-none');
}

function loadEmployees() {
  fetch(`${API}/employee`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('employee-table');
      tbody.innerHTML = data.map(emp => `
        <tr>
          <td>${emp.Emp_ID}</td>
          <td>${emp.name}</td>
          <td>${emp.email}</td>
          <td>${emp.Dept_ID}</td>
          <td>${emp.Desig_ID}</td>
          <td>
            <button class="del-btn" onclick="deleteEmployee(${emp.Emp_ID})">Delete</button>
          </td>
        </tr>
      `).join('');
    });
}

function addEmployee() {
  const name = document.getElementById('employee-name').value;
  const email = document.getElementById('employee-email').value;
  const dept_id = document.getElementById('employee-dept').value;
  const desig_id = document.getElementById('employee-desig').value;
  if (!name || !email || !dept_id || !desig_id) return alert('Fill all fields!');
  fetch(`${API}/employee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, dept_id, desig_id })
  })
  .then(res => res.json())
  .then(() => { loadEmployees(); alert('Employee Added!'); });
}

function updateEmployee() {
  const id = document.getElementById('update-emp-id').value;
  const name = document.getElementById('update-emp-name').value;
  const email = document.getElementById('update-emp-email').value;
  const dept_id = document.getElementById('update-emp-dept').value;
  const desig_id = document.getElementById('update-emp-desig').value;
  if (!id) return alert('Enter Emp ID!');
  fetch(`${API}/employee/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, dept_id, desig_id })
  })
  .then(res => res.json())
  .then(() => { loadEmployees(); alert('Employee Updated!'); });
}

function deleteEmployee(id) {
  if (!confirm('Delete this employee?')) return;
  fetch(`${API}/employee/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => { loadEmployees(); alert('Employee Deleted!'); });
}

function loadJoin() {
  fetch(`${API}/join`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('join-table');
      tbody.innerHTML = data.map(row => `
        <tr>
          <td>${row.Emp_ID}</td>
          <td>${row.name}</td>
          <td>${row.email}</td>
          <td>${row.Dept_Name}</td>
        </tr>
      `).join('');
    });
}

function loadDepartments() {
  fetch(`${API}/department`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('department-table');
      tbody.innerHTML = data.map(dept => `
        <tr>
          <td>${dept.Dept_ID}</td>
          <td>${dept.Dept_Name}</td>
          <td>
            <button class="del-btn" onclick="deleteDepartment(${dept.Dept_ID})">Delete</button>
          </td>
        </tr>
      `).join('');
    });
}

function addDepartment() {
  const dept_name = document.getElementById('department-name').value;
  if (!dept_name) return alert('Enter department name!');
  fetch(`${API}/department`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dept_name })
  })
  .then(res => res.json())
  .then(() => { loadDepartments(); alert('Department Added!'); });
}

function updateDepartment() {
  const id = document.getElementById('update-dept-id').value;
  const dept_name = document.getElementById('update-dept-name').value;
  if (!id || !dept_name) return alert('Fill all fields!');
  fetch(`${API}/department/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dept_name })
  })
  .then(res => res.json())
  .then(() => { loadDepartments(); alert('Department Updated!'); });
}

function deleteDepartment(id) {
  if (!confirm('Delete this department?')) return;
  fetch(`${API}/department/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => { loadDepartments(); alert('Department Deleted!'); });
}

function loadDesignations() {
  fetch(`${API}/designation`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('designation-table');
      tbody.innerHTML = data.map(desig => `
        <tr>
          <td>${desig.Desig_ID}</td>
          <td>${desig.Desig_Title}</td>
          <td>
            <button class="del-btn" onclick="deleteDesignation(${desig.Desig_ID})">Delete</button>
          </td>
        </tr>
      `).join('');
    });
}

function addDesignation() {
  const desig_title = document.getElementById('designation-title').value;
  if (!desig_title) return alert('Enter designation title!');
  fetch(`${API}/designation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desig_title })
  })
  .then(res => res.json())
  .then(() => { loadDesignations(); alert('Designation Added!'); });
}

function updateDesignation() {
  const id = document.getElementById('update-desig-id').value;
  const desig_title = document.getElementById('update-desig-title').value;
  if (!id || !desig_title) return alert('Fill all fields!');
  fetch(`${API}/designation/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desig_title })
  })
  .then(res => res.json())
  .then(() => { loadDesignations(); alert('Designation Updated!'); });
}

function deleteDesignation(id) {
  if (!confirm('Delete this designation?')) return;
  fetch(`${API}/designation/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => { loadDesignations(); alert('Designation Deleted!'); });
}

function loadSalaries() {
  fetch(`${API}/salary`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('salary-table');
      tbody.innerHTML = data.map(sal => `
        <tr>
          <td>${sal.Sal_ID}</td>
          <td>${sal.Emp_ID}</td>
          <td>${sal.amount}</td>
          <td>${sal.month}</td>
          <td>
            <button class="del-btn" onclick="deleteSalary(${sal.Sal_ID})">Delete</button>
          </td>
        </tr>
      `).join('');
    });
}

function addSalary() {
  const emp_id = document.getElementById('salary-employee').value;
  const amount = document.getElementById('salary-amount').value;
  const month = document.getElementById('salary-month').value;
  if (!emp_id || !amount || !month) return alert('Fill all fields!');
  fetch(`${API}/salary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emp_id, amount, month })
  })
  .then(res => res.json())
  .then(() => { loadSalaries(); alert('Salary Added!'); });
}

function updateSalary() {
  const id = document.getElementById('update-sal-id').value;
  const amount = document.getElementById('update-sal-amount').value;
  const month = document.getElementById('update-sal-month').value;
  if (!id) return alert('Enter Sal ID!');
  fetch(`${API}/salary/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, month })
  })
  .then(res => res.json())
  .then(() => { loadSalaries(); alert('Salary Updated!'); });
}

function deleteSalary(id) {
  if (!confirm('Delete this salary record?')) return;
  fetch(`${API}/salary/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => { loadSalaries(); alert('Salary Deleted!'); });
}

function loadAttendances() {
  fetch(`${API}/attendance`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('attendance-table');
      tbody.innerHTML = data.map(att => `
        <tr>
          <td>${att.Att_ID}</td>
          <td>${att.Emp_ID}</td>
          <td>${att.date}</td>
          <td>${att.status}</td>
          <td>
            <button class="del-btn" onclick="deleteAttendance(${att.Att_ID})">Delete</button>
          </td>
        </tr>
      `).join('');
    });
}

function addAttendance() {
  const emp_id = document.getElementById('attendance-employee').value;
  const date = document.getElementById('attendance-date').value;
  const status = document.getElementById('attendance-status').value;
  if (!emp_id || !date) return alert('Fill all fields!');
  fetch(`${API}/attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emp_id, date, status })
  })
  .then(res => res.json())
  .then(() => { loadAttendances(); alert('Attendance Added!'); });
}

function updateAttendance() {
  const id = document.getElementById('update-att-id').value;
  const status = document.getElementById('update-att-status').value;
  if (!id) return alert('Enter Att ID!');
  fetch(`${API}/attendance/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  .then(res => res.json())
  .then(() => { loadAttendances(); alert('Attendance Updated!'); });
}

function deleteAttendance(id) {
  if (!confirm('Delete this attendance record?')) return;
  fetch(`${API}/attendance/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => { loadAttendances(); alert('Attendance Deleted!'); });
}