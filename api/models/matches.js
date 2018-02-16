var mongoose = require('mongoose');
const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    matchImage: String,
    result: String
});

module.exports = mongoose.model('Match', matchSchema);
