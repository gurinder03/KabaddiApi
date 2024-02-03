
const mongoose = require('mongoose');

module.exports.updateReset = async(query,io, name) => {
    let update = {};
    update = {
        'teamA_score.hold': 0,   
        'teamA_score.stopper': 0,
        'teamA_score.raider': 0,
        'teamA_score.score': 0,
        'teamA_score.position': "none",
        'teamA.admin_position':"none",
        'teamA_score.addon':0,
        'teamB_score.hold': 0,
        'teamB_score.stopper': 0,
        'teamB_score.raider': 0,
        'teamB_score.score': 0,
        'teamB_score.position': "none",
        'teamB.admin_position':"none",
        'teamB_score.addon':0,
        is_score_added: false
    }

    mongoose.model("matches").findOneAndUpdate(query, update, { new: true })   
    .populate('teamA')
    .populate('teamB')
    .populate('tournament')
    .populate('winning_team')
    .populate('losing_team')
    .then((resdata) => {
        io.emit(name, resdata);
    }).catch((err) => {
        console.log("Error", err);
    })

}