const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: '10.11.90.15',
    port: 3306,
    user: 'AppUser',
    password: 'Special888%',
    database: 'Study'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Challenge6.html'));
});

// Handle the form submission and send JSON response
app.post('/search', (req, res) => {
    const { department, position, minSalary, maxSalary } = req.body;

    let query = "SELECT * FROM Challenge6_Zorawar";
    let queryParams = [];

    if (department) {
        query += " AND department = ?";
        queryParams.push(department);
    }
    if (position) {
        query += " AND position = ?";
        queryParams.push(position);
    }
    if (minSalary) {
        query += " AND salary >= ?";
        queryParams.push(minSalary);
    }
    if (maxSalary) {
        query += " AND salary <= ?";
        queryParams.push(maxSalary);
    }

    // Execute the query
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Send the results back as JSON
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});