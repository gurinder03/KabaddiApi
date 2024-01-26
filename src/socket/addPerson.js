
const mongoose = require('mongoose');
module.exports.updatePerson = async(query, update,payload, io, name) => {
    console.log("=====",update,query,payload);
    mongoose.model("matches").findOneAndUpdate(query, update, { new: true })
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team').then((resdata) => {
            console.log("resdata resdata",resdata)
            if(update.is_show_refree){
                resdata.refree = payload;
            }
            if(update.is_show_coach){
                resdata.coach = payload;
            }
            if(update.is_show_chiefguest){
                resdata.chiefguest = payload;
            }
            if(update.is_show_commentator){
                resdata.commentator = payload;
            }
            if(update.is_show_match){
                resdata.match = payload;
            }
            io.emit(name, resdata);
        }).catch((err) => {
            console.log("Error", err);
        })

}