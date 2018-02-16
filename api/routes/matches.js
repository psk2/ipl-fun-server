const express = require('express');
const router = express.Router();
const Matches = require('../models/matches')
const mongoose = require('mongoose');
const multer = require('multer')
const checkAuth =require('../middlewarae/check-auth')
const matchesController = require('../controllers/matchesController')
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

console.log('inside router file');
router.get('/', checkAuth, matchesController.getAllMatches)

router.post('/',checkAuth, uploads.single('matchImage') , matchesController.createMatch)

router.get('/:matchId',checkAuth,matchesController.getMatchById)

router.patch('/:matchId',checkAuth,matchesController.updateMatch)

router.delete('/:matchId',checkAuth,matchesController.deleteMatch )


module.exports = router;
