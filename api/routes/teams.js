const express = require('express');
const router = express.Router();
const Teams = require('../models/matches')
const mongoose = require('mongoose');
const checkAuth =require('../middlewarae/check-auth')
const teamsController = require('../controllers/teamsController')


router.get('/',checkAuth, teamsController.getAllTeams)

router.post('/',checkAuth, teamsController.createTeam)

router.get('/:teamId',checkAuth,teamsController.getTeamById)

router.patch('/:teamId',checkAuth,teamsController.updateTeam)

router.delete('/:teamId',checkAuth,teamsController.deleteTeam )


module.exports = router;