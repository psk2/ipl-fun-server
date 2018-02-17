const express = require('express');
const router = express.Router();
const Matches = require('../models/matches')
const mongoose = require('mongoose');
const multer = require('multer')
const checkAuth =require('../middlewarae/check-auth')
const matchesController = require('../controllers/matchesController');

router.get('/', checkAuth, matchesController.getAllMatches)

router.post('/',checkAuth, matchesController.createMatch)

router.get('/:matchId',checkAuth,matchesController.getMatchById)

router.patch('/:matchId',checkAuth,matchesController.updateMatch)

router.delete('/:matchId',checkAuth,matchesController.deleteMatch )


module.exports = router;
