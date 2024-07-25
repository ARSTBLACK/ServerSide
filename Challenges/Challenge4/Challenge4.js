const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3008;

// Database connection config
const connection = mysql.createConnection({
    host: '10.11.90.15',
    port: 3306,
    user: 'AppUser',
    password: 'Special888%',
    database: 'Study'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.use(bodyParser.json());

// Serve the Challenge4 HTML files
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// dashboard page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Handle login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database
    connection.query('SELECT * FROM Challenge4_Zorawar WHERE User = ?', [username], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        // Check if user exists
        if (results.length === 0) {
            res.json({ success: false, message: 'Invalid User or Pass' });
            return;
        }

        const Challenge4_Zorawar = results[0];
        // Validate password
        if (Challenge4_Zorawar.Pass !== password) {
            res.json({ success: false, message: 'Invalid User or Pass' });
            return;
        }

        res.json({ success: true, message: 'Login successful' });
    });
});

// Handle registration form
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if username alr exists
    connection.query('SELECT * FROM Challenge4_Zorawar WHERE User = ?', [username], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        if (results.length > 0) {
            res.json({ success: false, message: 'Username already exists' });
            return;
        }

        // Insert new user
        connection.query('INSERT INTO Challenge4_Zorawar (User, Pass) VALUES (?, ?)', [username, password], (err, results) => {
            if (err) {
                console.error('Error inserting into the database:', err);
                res.status(500).json({ success: false, message: 'An error occurred' });
                return;
            }

            res.json({ success: true, message: 'Registration successful' });
        });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
