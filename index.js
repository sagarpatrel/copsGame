const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const router = express.Router();
var cors = require('cors')
// app.use(express.json());
app.use(cors())
let cities = [
    { id: 0, name: 'Yapkashnagar', distance: 60, isAssigned: false },
    { id: 1, name: 'Lihaspur', distance: 50, isAssigned: false },
    { id: 2, name: 'Narmis City', distance: 40, isAssigned: false },
    { id: 3, name: 'Shekharvati', distance: 30, isAssigned: false },
    { id: 4, name: 'Nuravgram', distance: 20, isAssigned: false },
];
const vehicles = [
    { id: 0, type: 'EV Bike', range: 60, count: 2, notAvailable: false },
    { id: 1, type: 'EV Car', range: 100, count: 1, notAvailable: false },
    { id: 2, type: 'EV SUV', range: 60, count: 1, notAvailable: false },
];
const cops = [
    'Sagar', 'Pawan', 'Akash'
]

// Simulate fugitive location
function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex].name;
}
// console.log(getRandomCity());

app.get('/', (req, res) => { res.send('App is running') })
app.get('/cities', (req, res) => res.json(cities));
app.get('/vehicles', (req, res) => res.json(vehicles));
app.post('/cities', (req, res) => {
    // console.log(req.body);
    let { id, isAssigned } = req.body;

    cities = cities.map(city => {
        if (city.id == id) {
            city.isAssigned = isAssigned
        }
        return city
    })
    res.json('City successfully updated')

});
app.post('/results', (req, res) => {
    const { copSelections } = req.body;
    if (!copSelections) {
        // Handle invalid request
        return res.status(400).json({ error: 'Invalid request' });
    }
    const fugitiveLocation = getRandomCity()
    //   cops1
    let cops1 = cities[Number(copSelections.cops1.city)]
    let cops1Distance = cops1.distance;
    let cops1City = cops1.name;
    let cops1vechicle = vehicles[copSelections.cops1.vehicle].range;
    // cops2
    let cops2 = cities[Number(copSelections.cops2.city)]
    let cops2Distance = cops2.distance;
    let cops2City = cops2.name;
    let cops2vechicle = vehicles[copSelections.cops2.vehicle].range;

    // cops3
    let cops3 = cities[Number(copSelections.cops3.city)]
    let cops3Distance = cops3.distance;
    let cops3City = cops3.name;
    let cops3vechicle = vehicles[copSelections.cops3.vehicle].range;

    if ((cops1Distance * 2) <= cops1vechicle && cops1City == fugitiveLocation) {
        res.json('Cop ' + copSelections.cops1.name + ' catched the Criminal')
    }
    if ((cops2Distance * 2) <= cops2vechicle && cops2City == fugitiveLocation) {
        res.json('Cop ' + copSelections.cops2.name + ' catched the Criminal')
    }
    if ((cops3Distance * 2) <= cops3vechicle && cops3City == fugitiveLocation) {
        res.json('Cop ' + copSelections.cops3.name + ' catched the Criminal')
    }
    else {
        res.json('No one wins, Criminal is in ' + fugitiveLocation + ' place')
    }
})

// app.get("/", (req, res) => res.send("Main page"));

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });