
const mongoose = require('mongoose');
module.exports.match = async (query, io, name) => {
    mongoose.model("matches").findOne(query)
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team').then((resdata) => {
            io.emit(name, resdata);
        }).catch((err) => {
            console.log("Error", err);
        })


}

module.exports.tempmatch = async (query,update, io, name) => {
    mongoose.model("matches").findOne(query)
    .populate('teamA')
    .populate('teamB')
    .populate('tournament')
    .populate('winning_team')
    .populate('losing_team').then(async(resdata) => {
        let tempData = await mongoose.model("tempmatch").findOneAndUpdate(update,{new: true}).then().catch();
        let result = {...resdata,...tempData};
        io.emit(name, result);
    }).catch((err) => {
        console.log("Error", err);
    })

}
