
const mongoose = require('mongoose');


module.exports.updateTempData = async(update, io,name) => {
    mongoose.model("tempmatch").findOneAndUpdate({}, update, { new: true })
    .then((resdata) => {    
        io.emit(name, resdata);
    }).catch((err) => {
        console.log("Error", err);
    })

}



module.exports.updateAddData = async(query, update, io, name) => {
    mongoose.model("matches").findOneAndUpdate(query, update, { new: true })
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team').then((resdata) => {
            console.log("resdata resdata",resdata)
            io.emit(name,  resdata);
        }).catch((err) => {
            console.log("Error", err);
        })  

}

