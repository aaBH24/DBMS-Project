const express = require('express');
const mysql = require('mysql2'); // Use 'pg' for choosing PostgreSQL
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors()); // Allows frontend/backend communication
app.use(express.json()); // Parses JSON for DML (Insert/Update) queries
app.use(express.static(path.join(__dirname, 'public'))); // Serves your index.html, styles.css, and script.js

// Database Connection via Handshake
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'mec', 
    database: 'employee_management' 
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to Database.');
});

// DQL API ROUTES 
// Employee Tab 
app.get('/api/employee', (req, res) => {
    const query = `
        SELECT 
            e.emp_id AS "ID", 
            e.first_name AS "First Name", 
            e.last_name AS "Last Name", 
            d.dept_name AS "Department", 
            j.job_title AS "Designation",
            e.email AS "Email"
        FROM Employee e
        JOIN Department d ON e.dept_id = d.dept_id
        JOIN JobDesc j ON e.job_id = j.job_id`;
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Department Tab
app.get('/api/department', (req, res) => {
    db.query('SELECT dept_id AS "ID", dept_name AS "Name", location AS "Location" FROM Department', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Jobdesc Tab 
app.get('/api/designation', (req, res) => {
    db.query('SELECT job_id AS "ID", job_title AS "Title", min_salary AS "Min Pay", max_salary AS "Max Pay" FROM JobDesc', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Salary Tab
app.get('/api/salary', (req, res) => {
    const query = `
        SELECT 
            s.salary_id AS "ID", 
            e.first_name AS "Employee", 
            s.basic_salary AS "Base", 
            s.allowances AS "Bonus", 
            s.pay_date AS "Date"
        FROM Salary s
        JOIN Employee e ON s.emp_id = e.emp_id`;
        
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Attendance Tab
app.get('/api/attendance', (req, res) => {
    const query = `
        SELECT 
            a.attendance_id AS "ID", 
            e.first_name AS "Employee", 
            a.date AS "Date", 
            a.status AS "Status"
        FROM Attendance a
        JOIN Employee e ON a.emp_id = e.emp_id`;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});