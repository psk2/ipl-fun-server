const Match = require('../models/matches')
const mongoose = require('mongoose');

exports.getAllMatches = (req, res, next) => {
    Match.find()
        .populate("teamA teamB")
        .exec()
        .then(result => {
            response = {
                count: result.length,
                data: result
            }
            res.status(201).json(response);
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })
}

exports.getMatchById = (req, res, next) => {
    const id = req.params.matchId
    Match.findById(id)
        .exec()
        .then(result => {
            console.log('result', result)
            if (result)
                res.status(201).json({
                    message: "you discovered the special ID",
                    data: result
                }); else {
                res.status(404).json({
                    message: "No data found for the given ID"
                })
            }
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })

}

exports.createMatch = (req, res, next) => {
    console.log("inside this")
    const match = new Match({
        _id: new mongoose.Types.ObjectId(),
        teamA: req.body.teamA,
        teamB: req.body.teamB,
        matchImage: req.file.path,
        result: req.body.result
    });
    match.save()
        // .exec()
        .then(match => {
            res.status(201).json({
                message: "Handling POST request to matches",
                createdMatch: match
            });
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })

}

exports.updateMatch = (req, res, next) => {
    console.log('req', req.body)
    const id = req.params.matchId
    const updateObj = {};
    for (let ops of req.body) {
        updateObj[ops.key] = ops.value
    }
    console.log('updateObj', updateObj)

    Match.update(
        {
            _id: id
        },
        {
            $set: updateObj
        }

    )
        .exec()
        .then(result => {
            console.log('result', result)
            res.status(201).json({
                message: "Handling POST request to matches",
                createdMatch: result
            });
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })
}

exports.deleteMatch = (req, res, next) => {
    const id = req.params.matchId
    Match.remove({ _id: id })
        .exec()
        .then(result => {
            console.log('result', result)
            if (result)
                res.status(201).json({
                    message: "success",
                    data: result
                }); else {
                res.status(404).json({
                    message: "No data found for the given ID"
                })
            }
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })
}