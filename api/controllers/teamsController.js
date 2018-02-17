const Team = require('../models/team')
const mongoose = require('mongoose');

exports.getAllTeams = (req, res, next) => {
    Team.find()
        .exec()
        .then(result => {
            response = {
                count: result.length,
                data : result
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

exports.getTeamById =  (req, res, next) => {
    const id = req.params.teamId
    Team.findById(id)
        .exec()
        .then(result => {
            if (result)
                res.status(201).json({
                    message: "Success",
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

exports.createTeam = (req, res, next) => {
    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code,
        teamImage:req.file.path
    });
    team.save()
        // .exec()
        .then(team => {
            res.status(201).json({
                message: "New Team Added Successfully",
                data: team
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })

}

exports.updateTeam =  (req, res, next) => {
    const id = req.params.teamId
    const updateObj = {};
    for (let ops of req.body) {
        updateObj[ops.key] = ops.value
    }
    console.log('updateObj', updateObj)

    Team.update(
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
                message: "Updated Team Detials seccessfully",
                data: result
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

exports.deleteTeam = (req, res, next) => {
    const id = req.params.teamId
    Team.remove({ _id: id })
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
