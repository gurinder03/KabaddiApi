
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
        .populate('losing_team').then(async(resdata) => {
            let tempData = await mongoose.model("tempmatch").findOneAndUpdate({},update,{new: true}).then().catch();
            console.log(empData.is_show_full_screen);
            resdata.is_show_federation_logo = tempData.is_show_federation_logo
            resdata.is_show_add =   tempData.is_show_add
            resdata.is_show_coach =  tempData.is_show_coach
            resdata.is_show_player =      tempData.is_show_player
            resdata.is_show_marquee_logo = tempData.is_show_marquee_logo
            resdata.is_show_full_screen = tempData.is_show_full_screen
            resdata.is_swap_team =  tempData.is_swap_team
            resdata.is_show_refree = tempData.is_show_refree
            resdata.is_show_chiefguest = tempData.is_show_chiefguest
            resdata.is_show_team =  tempData.is_show_team
            resdata.is_show_commentator = tempData.is_show_commentator
            resdata.is_show_match = tempData.is_show_match
            resdata.is_show_flag =  tempData.is_show_flag
            resdata.is_show_score = tempData.is_show_score
            resdata.is_show_sponser_logo =  tempData.is_show_sponser_logo
            resdata.chiefguest =   tempData.chiefguest
            resdata.team  = tempData.team
            resdata.refree =  tempData.refree
            resdata.commentator = tempData.commentator
            resdata.match =  tempData.match
            resdata.card = tempData.card
            resdata.coach =  tempData.coach
            resdata.player =  tempData.player 
            io.emit(name,  resdata);
        }).catch((err) => {
            console.log("Error", err);
        })  

}

