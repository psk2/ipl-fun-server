const express = require('express');
const router = express.Router();
const Teams = require('../models/matches')
const mongoose = require('mongoose');
const checkAuth =require('../middlewarae/check-auth')
const teamsController = require('../controllers/teamsController')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads')
    },
    filename: (req,file,cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const uploads = multer({storage:storage, limits:{
    fileSize: 1024 * 1024 *5
}});

router.get('/',checkAuth, teamsController.getAllTeams)

router.post('/',checkAuth, uploads.single('teamImage'), teamsController.createTeam)

router.get('/:teamId',checkAuth,teamsController.getTeamById)

router.patch('/:teamId',checkAuth,teamsController.updateTeam)

router.delete('/:teamId',checkAuth,teamsController.deleteTeam )


module.exports = router;
