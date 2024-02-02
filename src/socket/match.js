
const mongoose = require('mongoose');
module.exports.match = async(query,io,name)=>{
mongoose.model("matches").findOne(query)
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team').then((resdata) => {
            io.emit(name, resdata);
            io.emit("updateScore",resdata);
        }).catch((err) => {
            console.log("Error", err);
        })


}
