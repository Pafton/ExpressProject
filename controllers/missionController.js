const path = require('path'); 
const fs = require('fs');
const { json } = require('express');

const missions = [
    {
        "id": 1,
        "name": "Apollo 11",
        "startDate": "1969-07-16",
        "description": "Pierwsza misja lądowania człowieka na Księżycu, z udziałem Neila Armstronga, Buzza Aldrina i Michaela Collinsa.",
        "crew": [
            { "name": "Neil Armstrong", "role": "Dowódca" },
            { "name": "Buzz Aldrin", "role": "Pilot Modułu Księżycowego" },
            { "name": "Michael Collins", "role": "Pilot Modułu Dowodzenia" }
        ],
        "image": ["apollo11.jpg"]
    },
    {
        "id": 2,
        "name": "Gemini 8",
        "startDate": "1966-03-16",
        "description": "Misja, która po raz pierwszy dokonała udanego dokowania dwóch pojazdów kosmicznych na orbicie.",
        "crew": [
            { "name": "Neil Armstrong", "role": "Dowódca Pilotażowy" },
            { "name": "David Scott", "role": "Pilot" }
        ],
        "image": ["gemini8.jpg"]
    },
    {
        "id": 3,
        "name": "Mercury-Atlas 6",
        "startDate": "1962-02-20",
        "description": "Pierwsza amerykańska misja orbitalna, której celem było okrążenie Ziemi przez astronautę Johna Glenna.",
        "crew": [
            { "name": "John Glenn", "role": "Pilot" }
        ],
        "image": ["mercury-atlas-6.jpg"]
    },
    {
        "id": 4,
        "name": "Apollo 13",
        "startDate": "1970-04-11",
        "description": "Misja księżycowa, która zakończyła się niepowodzeniem z powodu eksplozji na statku kosmicznym, ale załoga bezpiecznie wróciła na Ziemię.",
        "crew": [
            { "name": "James A. Lovell", "role": "Dowódca" },
            { "name": "John L. Swigert", "role": "Pilot Modułu Dowodzenia" },
            { "name": "Fred W. Haise", "role": "Pilot Modułu Księżycowego" }
        ],
        "image": ["apollo13.jpg"]
    },
    {
        "id": 5,
        "name": "Apollo 12",
        "startDate": "1969-11-14",
        "description": "Druga misja lądowania na Księżycu, której celem było dalsze badanie powierzchni i zbieranie próbek.",
        "crew": [
            { "name": "Charles Conrad", "role": "Dowódca" },
            { "name": "Alan L. Bean", "role": "Pilot Modułu Księżycowego" },
            { "name": "Richard F. Gordon", "role": "Pilot Modułu Dowodzenia" }
        ],
        "image": ["apollo12.jpg"]
    },
    {
        "id": 6,
        "name": "STS-1",
        "startDate": "1981-04-12",
        "description": "Pierwszy lot programu Space Shuttle z załogą, prowadzony przez Columbię. Początek nowej ery promów kosmicznych.",
        "crew": [
            { "name": "John W. Young", "role": "Dowódca" },
            { "name": "Robert L. Crippen", "role": "Pilot" }
        ],
        "image": ["sts-1.jpg"]
    },
    {
        "id": 7,
        "name": "Wostok 1",
        "startDate": "1961-04-12",
        "description": "Pierwszy załogowy lot kosmiczny, podczas którego Jurij Gagarin okrążył Ziemię i stał się pierwszym człowiekiem w kosmosie.",
        "crew": [
            { "name": "Jurij Gagarin", "role": "Pilot" }
        ],
        "image": ["wostok1.jpg"]
    },
    {
        "id": 8,
        "name": "Woschod 2",
        "startDate": "1965-03-18",
        "description": "Misja, podczas której Aleksiej Leonow przeprowadził pierwszy spacer kosmiczny.",
        "crew": [
            { "name": "Pavel Belyayev", "role": "Dowódca" },
            { "name": "Alexei Leonov", "role": "Pilot" }
        ],
        "image": ["wostok2.jpg"]
    },
    {
        "id": 9,
        "name": "Sojuz 4 i 5",
        "startDate": "1969-01-14",
        "description": "Pierwsze w historii połączenie dwóch załogowych statków kosmicznych na orbicie i wymiana załogi.",
        "crew": [
            { "name": "Vladimir Shatalov", "role": "Dowódca (Sojuz 4)" },
            { "name": "Alexei Yeliseyev", "role": "Inżynier Lotu (Sojuz 5)" },
            { "name": "Yevgeny Khrunov", "role": "Kosmonauta Badawczy (Sojuz 5)" }
        ],
        "image": ["sojuz4-5.jpg"]
    },
    {
        "id": 10,
        "name": "Luna 16",
        "startDate": "1970-09-12",
        "description": "Pierwsza radziecka misja bezzałogowa, która pomyślnie pobrała próbki z powierzchni Księżyca i przywiozła je na Ziemię.",
        "crew": [
            { "name":"misja bezzałogowa" }
        ],
        "image": ["luna16.jpg"]
    }
];


exports.missionsOptions = function(req,res){
    res.render('missions');
}

exports.getAllMission = function(req,res){
    res.render('getMission', {missions: missions})
}

exports.oneMission = function(req, res) {    
    const { name, startDate, endDate } = req.query
    let filteredMissions = missions
    const searchPerformed = !!(name || (startDate && endDate))

    if (name) {
        filteredMissions = filteredMissions.filter(m => 
            m.name.toLowerCase().includes(name.toLowerCase())
        )
    }

    if (startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)
        
        filteredMissions = filteredMissions.filter(m => {
            const missionDate = new Date(m.startDate)
            return missionDate >= start && missionDate <= end
        })
    }
    res.render('getOneMission', { missions: filteredMissions, searchPerformed });
};

exports.missionsJSON = function(req, res) {
    const missionJSON = JSON.stringify(missions,null,2);
    const filePath = path.join(__dirname, 'missions.json');
    fs.writeFile(filePath, missionJSON, () => {
        res.json(missions)
    });
}

exports.downloadMissionsJSON  = function(req, res) {
    const missionJSON = JSON.stringify(missions,null,2);
    const filePath = path.join(__dirname, 'missions.json');
    fs.writeFile(filePath, missionJSON, () => {
        res.download(filePath, 'missions.json');
    });
}

exports.getImagesById = function(req, res) {
    const missionId = req.params.id; 
    const mission = missions.find(m => m.id == missionId); 

    if (!mission) {
        return res.status(404).send('Misja nie znaleziona');
    }
    res.render('gallery', { mission: mission });
};

exports.setNewMissionForm = function(req,res){
    res.render('setMission', { title: 'Dodaj Misję' })
}
exports.deleteMission = function(req,res){
    res.render('deleteMission', { missions, message: 'Wybierz misję do usunięcia' })
}
exports.deleteMissionById = function(req,res){
    const { id } = req.params
    const missionId = parseInt(id, 10)
    const missionIndex = missions.findIndex(mission => mission.id === missionId)

    if (missionIndex !== -1) {
        missions.splice(missionIndex, 1)
        res.redirect('/missions/deleteMission')
    } 
}
exports.setnewMission = function(req, res) {
    const { name, description, startDate, crew, image } = req.body;
    const crewMembers = crew ? crew.split(';').map(member => {
        const [memberName, memberRole] = member.split('-').map(item => item.trim());
        return { name: memberName, role: memberRole };
    }) : [];

    const newMission = {
        id: missions.length + 1,
        name,
        description,
        startDate,
        crew: crewMembers,
        image: image ? [image] : []
    };

    missions.push(newMission);
    console.log(newMission);
    console.log(missions);
    res.redirect('/');
};