const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'site', 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return res.send(`<h3>Invalid inputs! Please provide positive numbers for weight and height.</h3>`);
    }

    const bmi = weight / (height * height);
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    res.send(`
        <h1>Your BMI Result</h1>
        <p>Your BMI is: <b>${bmi.toFixed(2)}</b></p>
        <p>Category: <b style="color: ${getColor(category)};">${category}</b></p>
        <a href="/">Go Back</a>
    `);
});

// Helper function for category colors
function getColor(category) {
    switch (category) {
        case 'Underweight': return 'blue';
        case 'Normal weight': return 'green';
        case 'Overweight': return 'yellow';
        case 'Obese': return 'red';
        default: return 'black';
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
