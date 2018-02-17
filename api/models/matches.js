var mongoose = require('mongoose');
const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teamA: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Team" },
    teamB: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Team" },
    matchDate: {
        type: Date,
        required: true
    },
    result: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Match', matchSchema);
