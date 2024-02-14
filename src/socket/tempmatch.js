
const mongoose = require('mongoose');


module.exports.updateTempData = async(update, io,name) => {
    mongoose.model("tempmatch").findOneAndUpdate({}, update, { new: true })
    .then((resdata) => {    
        io.emit(name, resdata);
    }).catch((err) => {
        console.log("Error", err);
    })

}


// socket tempDataGet me emit karna hai array
// socket tempDataSet ko on karna hai 

// socket getRound me emit karna hai match_id or round
// socket setRound ko on karna hai