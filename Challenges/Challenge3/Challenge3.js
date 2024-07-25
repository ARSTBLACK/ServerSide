const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3008;

// Database connection configuration
const connection = mysql.createConnection({
    host: '10.11.90.15',
    port: 3306,
    user: 'AppUser',
    password: 'Special888%',
    database: 'Study'
});


connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/count', (req, res) => {
    const query = `
        SELECT COUNT(*) AS total
        FROM Country
        WHERE Continent = 'AS'
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred');
            return;
        }

        const totalCountries = results[0].total-1;
        res.send(`There are ${totalCountries} total countries!`);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
