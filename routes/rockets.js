const express = require('express');
const router = express.Router();

const rockets = [
    {
        "id": 1,
        "name": "Falcon 9",
        "type": "Nośnik",
        "year": 2010,
        "height": 70,
        "payload": 22800,
        "description": "Falcon 9 to wielokrotnego użytku rakieta nośna opracowana przez SpaceX."
    },
    {
        "id": 2,
        "name": "Saturn V",
        "type": "Nośnik",
        "year": 1967,
        "height": 110.6,
        "payload": 140000,
        "description": "Saturn V to rakieta nośna, która wyniosła astronautów na Księżyc w ramach misji Apollo."
    },
    {
        "id": 3,
        "name": "Space Shuttle",
        "type": "Wielokrotnego użytku",
        "year": 1981,
        "height": 56.1,
        "payload": 24000,
        "description": "Space Shuttle to amerykański program rakietowy, który umożliwiał wielokrotne loty w kosmos."
    },
    {
        "id": 4,
        "name": "Vostok-K",
        "type": "Nośnik",
        "year": 1960,
        "height": 28.1,
        "payload": 4730,
        "description": "Vostok-K wyniósł pierwszego człowieka, Jurija Gagarina, na orbitę okołoziemską w 1961 roku."
    },
    {
        "id": 5,
        "name": "Atlas LV-3B",
        "type": "Nośnik",
        "year": 1958,
        "height": 28,
        "payload": 1360,
        "description": "Atlas LV-3B wyniósł Johna Glenna, pierwszego Amerykanina na orbicie, w ramach programu Mercury."
    },
    {
        "id": 6,
        "name": "Ariane 5",
        "type": "Nośnik",
        "year": 1996,
        "height": 53,
        "payload": 21600,
        "description": "Ariane 5 to europejska rakieta nośna używana do wynoszenia satelitów i ładunków na orbitę geostacjonarną."
    },
    {
        "id": 7,
        "name": "Delta II",
        "type": "Nośnik",
        "year": 1989,
        "height": 38.9,
        "payload": 6100,
        "description": "Delta II odegrała kluczową rolę w wynoszeniu satelitów na średnią orbitę oraz misji marsjańskich NASA."
    },
    {
        "id": 8,
        "name": "Soyuz-FG",
        "type": "Nośnik",
        "year": 2001,
        "height": 49.5,
        "payload": 7100,
        "description": "Soyuz-FG wynosił załogowe misje do Międzynarodowej Stacji Kosmicznej przez prawie dwie dekady."
    },
    {
        "id": 9,
        "name": "Long March 3B",
        "type": "Nośnik",
        "year": 1996,
        "height": 54.8,
        "payload": 12500,
        "description": "Long March 3B jest najpotężniejszą rakietą w chińskim programie kosmicznym, często używaną do wynoszenia satelitów na orbitę geostacjonarną."
    },
    {
        "id": 10,
        "name": "Proton-K",
        "type": "Nośnik",
        "year": 1965,
        "height": 53,
        "payload": 20600,
        "description": "Proton-K wyniósł wiele kluczowych sond i satelitów w ramach radzieckiego i rosyjskiego programu kosmicznego."
    }
];

router.get('/', (req, res) => {
    res.render('rockets', {
        title: 'Lista Rakiet',
        rockets: rockets,
    });
});

router.get('/:id', (req, res) => {
    const rocketId = parseInt(req.params.id); 
    const rocket = rockets.find(r => r.id === rocketId); 

    if (!rocket) {
        return res.status(404).send('Rakieta nie znaleziona');
    }

    res.render('rocketDetails', { rocket });
});

module.exports = router;
