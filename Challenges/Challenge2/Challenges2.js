const express = require('express');
const path = require('path');
const app = express();
const port = 3008;

app.get('/abc', (req, res) => {
    res.sendFile(path.join(__dirname, 'Challenge2.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/abc`);
});
