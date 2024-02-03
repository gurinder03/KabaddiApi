
const mongoose = require('mongoose');

module.exports.updateScore = async(query, update,data, io, name) => {
        mongoose.model("matches").findOneAndUpdate(query, update,{new: true})
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team').then(async(resdata) => {
            let score;
            let res_data;
            if (data.team == 'A') {
                score = resdata.teamA_score.raider + resdata.teamA_score.stopper + resdata.teamA_score.addon;
                res_data = await  mongoose.model("matches").findOneAndUpdate(query, { 'teamA_score.score': score},{new: true})
                .populate('teamA')
                .populate('teamB')
                .populate('tournament')
                .populate('winning_team')
                .populate('losing_team').then().catch();
            }
            if (data.team == 'B') {
                score = resdata.teamB_score.raider + resdata.teamB_score.stopper + resdata.teamB_score.addon;
                res_data = await  mongoose.model("matches").findOneAndUpdate(query, { 'teamB_score.score': score},{new: true})
                .populate('teamA')
                .populate('teamB')
                .populate('tournament')
                .populate('winning_team')
                .populate('losing_team').then().catch();
            }
            io.emit(name, res_data);
        }).catch((err) => {
            console.log("Error", err);
        })

}