
const mongoose = require('mongoose');

module.exports.updatePerson = async(query, update, io, name) => {
    mongoose.model("matches").findOneAndUpdate(query, update, { new: true })
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team').then((resdata) => {
            console.log("=====resdata",resdata);
            io.emit(name, resdata);
        }).catch((err) => {
            console.log("Error", err);
        })

}