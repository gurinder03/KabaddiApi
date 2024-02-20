
const mongoose = require('mongoose');

module.exports = async (query, update, io, data, name) => {
    if (name == "checkStatus") {
        mongoose.model("matches").findOne(query, update).then((resdata) => {
            let res = {};
            if (data.team == 'A') {
                res = {
                    match_id: resdata._id,
                    team: data.team,
                    teamA_score: resdata.teamA_score
                }
            }
            if (data.team == 'B') {
                res = {
                    match_id: resdata._id,
                    team: data.team,
                    teamB_score: resdata.teamB_score
                }
            }
            io.emit(name, res);
        }).catch((err) => {
            console.log("Error", err);
        })
    } else {
        mongoose.model("matches").findOneAndUpdate(query, update, { new: true }).then(async (resdata) => {

            let res = {};
            let data_Res;
            if (data.team == 'A') {
                let score;
                let isScore = false;
                score = resdata.teamA_score.raider + resdata.teamA_score.stopper;

                if (!isScore) {
                    score = resdata.teamA_score.raider + resdata.teamA_score.stopper + resdata.teamA_score.addon;
                    isScore = true
                }
                data_Res = await mongoose.model("matches").findOneAndUpdate(query, { 'teamA_score.score': score,is_score_done: isScore }, { new: true }).then().catch();
                res = {
                    match_id: resdata._id,
                    team: data.team,
                    teamA_score: data_Res.teamA_score
                }
            }
            if (data.team == 'B') {
                let score;
                let isScore = false;
                score = resdata.teamB_score.raider + resdata.teamB_score.stopper;
                if (!isScore) {
                    score = resdata.teamB_score.raider + resdata.teamB_score.stopper + resdata.teamB_score.addon;
                    isScore = true;
                }
                data_Res = await mongoose.model("matches").findOneAndUpdate(query, { 'teamB_score.score': score,is_score_done: isScore }, { new: true }).then().catch();
                res = {
                    match_id: resdata._id,
                    team: data.team,
                    teamB_score: data_Res.teamB_score
                }
            }

            io.emit(name, res);
        }).catch((err) => {
            console.log("Error", err);
        })
    }

}
