const express = require('express');
const app = express();
const serverless = require("serverless-http");
const router = express.Router();
// In-memory data structures (replace with actual database for scalability)
const cities = [
    { name: 'Yapkashnagar', distance: 60 },
    { name: 'Lihaspur', distance: 50 },
    { name: 'Narmis City', distance: 40 },

];
const vehicles = [
    { type: 'EV Bike', range: 60, count: 2 },
    { type: 'EV Car', range: 100, count: 1 },
    { type: 'EV SUV', range: 60, count: 1 },
];
const cops = [
    'cop1', 'cop2', 'cop3'
]

// Simulate fugitive location
function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex].name;
}


router.get('/api/cities', (req, res) => res.json(cities));
router.get('/api/vehicles', (req, res) => res.json(vehicles));
router.post('/api/results', (req, res) => {
    const { copSelections } = req.body;

    const fugitiveLocation = getRandomCity
    res.json(copSelections)
})
// app.listen(3000, () => console.log('Server listening on port 3000'));
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
