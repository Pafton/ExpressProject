const express = require('express');
const router = express.Router();
var missionController = require('../controllers/missionController');
const SetNewMissionValidation = require('../middleware/SetNewMissionValidation.js');

router.get('/', missionController.missionsOptions)
router.get('/getMission', missionController.getAllMission)
router.get('/getOneMission', missionController.oneMission)
router.get('/missionJSON', missionController.missionsJSON)
router.get('/missionsJSON',missionController.downloadMissionsJSON)
router.get('/gallery/:id', missionController.getImagesById)
router.get('/deleteMission', missionController.deleteMission)
router.get('/delete/:id',missionController.deleteMissionById)
router.post('/', SetNewMissionValidation ,missionController.setnewMission)
router.get('/setMission', missionController.setNewMissionForm)



module.exports = router;
