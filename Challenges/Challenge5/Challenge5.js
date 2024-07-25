const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '.'))); // Serve static files from the current directory
app.use(express.json());

const dropdownData = {
    "Fruits": ["Apple", "Banana", "Orange", "Mango"],
    "Vegetables": ["Carrot", "Lettuce", "Spinach", "Tomato"]
};

app.get('/dropdown-data', (req, res) => {
    res.json(dropdownData);
});

app.post('/get-options', (req, res) => {
    const { category } = req.body;
    const options = dropdownData[category] || [];
    res.json(options);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Challenge5.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
