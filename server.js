const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname))); // Serve index.html and assets

// Load database
const rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
const planetsData = JSON.parse(rawData);

// API Endpoint for generic all data
app.get('/api/planets', (req, res) => {
    res.json(planetsData);
});

// API Endpoint for specific planet by ID
app.get('/api/planets/:id', (req, res) => {
    const planet = planetsData.find(p => p.id === req.params.id);
    if (planet) {
        res.json(planet);
    } else {
        res.status(404).json({ error: "Celestial body not found" });
    }
});

app.listen(PORT, () => {
    console.log(`SkyVerse Backend running at http://localhost:${PORT}`);
});
