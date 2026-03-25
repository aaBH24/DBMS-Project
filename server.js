const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@b4!24_8608134',
  database: 'employee'
});

db.connect(err => {
  if (err) { console.log('DB Error:', err); return; }
  console.log('MySQL Connected!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'proj1.html'));
});

app.get('/employee', (req, res) => {
  db.query('SELECT * FROM EMPLOYEE', (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.post('/employee', (req, res) => {
  const { name, email, dept_id, desig_id } = req.body;
  db.query('INSERT INTO EMPLOYEE (name, email, Dept_ID, Desig_ID) VALUES (?,?,?,?)',
  [name, email, dept_id, desig_id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Employee Added!' });
  });
});

app.put('/employee/:id', (req, res) => {
  const { name, email, dept_id, desig_id } = req.body;
  db.query('UPDATE EMPLOYEE SET name=?, email=?, Dept_ID=?, Desig_ID=? WHERE Emp_ID=?',
  [name, email, dept_id, desig_id, req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Employee Updated!' });
  });
});

app.delete('/employee/:id', (req, res) => {
  db.query('DELETE FROM EMPLOYEE WHERE Emp_ID = ?',
  [req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Employee Deleted!' });
  });
});

app.get('/department', (req, res) => {
  db.query('SELECT * FROM DEPARTMENT', (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.post('/department', (req, res) => {
  const { dept_name } = req.body;
  db.query('INSERT INTO DEPARTMENT (Dept_Name) VALUES (?)',
  [dept_name], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Department Added!' });
  });
});

app.put('/department/:id', (req, res) => {
  const { dept_name } = req.body;
  db.query('UPDATE DEPARTMENT SET Dept_Name=? WHERE Dept_ID=?',
  [dept_name, req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Department Updated!' });
  });
});

app.delete('/department/:id', (req, res) => {
  db.query('DELETE FROM DEPARTMENT WHERE Dept_ID = ?',
  [req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Department Deleted!' });
  });
});

app.get('/designation', (req, res) => {
  db.query('SELECT * FROM DESIGNATION', (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.post('/designation', (req, res) => {
  const { desig_title } = req.body;
  db.query('INSERT INTO DESIGNATION (Desig_Title) VALUES (?)',
  [desig_title], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Designation Added!' });
  });
});

app.put('/designation/:id', (req, res) => {
  const { desig_title } = req.body;
  db.query('UPDATE DESIGNATION SET Desig_Title=? WHERE Desig_ID=?',
  [desig_title, req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Designation Updated!' });
  });
});

app.delete('/designation/:id', (req, res) => {
  db.query('DELETE FROM DESIGNATION WHERE Desig_ID = ?',
  [req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Designation Deleted!' });
  });
});

app.get('/salary', (req, res) => {
  db.query('SELECT * FROM SALARY', (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.post('/salary', (req, res) => {
  const { emp_id, amount, month } = req.body;
  db.query('INSERT INTO SALARY (Emp_ID, amount, month) VALUES (?,?,?)',
  [emp_id, amount, month], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Salary Added!' });
  });
});

app.put('/salary/:id', (req, res) => {
  const { amount, month } = req.body;
  db.query('UPDATE SALARY SET amount=?, month=? WHERE Sal_ID=?',
  [amount, month, req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Salary Updated!' });
  });
});

app.delete('/salary/:id', (req, res) => {
  db.query('DELETE FROM SALARY WHERE Sal_ID = ?',
  [req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Salary Deleted!' });
  });
});

app.get('/attendance', (req, res) => {
  db.query('SELECT * FROM ATTENDANCE', (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.post('/attendance', (req, res) => {
  const { emp_id, date, status } = req.body;
  db.query('INSERT INTO ATTENDANCE (Emp_ID, date, status) VALUES (?,?,?)',
  [emp_id, date, status], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Attendance Added!' });
  });
});

app.put('/attendance/:id', (req, res) => {
  const { status } = req.body;
  db.query('UPDATE ATTENDANCE SET status=? WHERE Att_ID=?',
  [status, req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Attendance Updated!' });
  });
});

app.delete('/attendance/:id', (req, res) => {
  db.query('DELETE FROM ATTENDANCE WHERE Att_ID = ?',
  [req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'Attendance Deleted!' });
  });
});

app.get('/join', (req, res) => {
  db.query(`SELECT e.Emp_ID, e.name, e.email, d.Dept_Name 
            FROM EMPLOYEE e 
            JOIN DEPARTMENT d ON e.Dept_ID = d.Dept_ID`,
  (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});