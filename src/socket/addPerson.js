
const mongoose = require('mongoose');

module.exports.updatePerson = async(query, update, io, name) => {
    console.log("=====",update,query);
    mongoose.model("matches").findOneAndUpdate(query, update, { new: true })
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team').then((resdata) => {
            // console.log("resdata resdata",{"messagge":"This isntesting"})
            // io.emit(name, resdata);
            io.emit(name,{"messagge":"This isntesting"})
        }).catch((err) => {
            console.log("Error", err);
        })

}