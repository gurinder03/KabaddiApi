
const mongoose = require('mongoose');


module.exports.updateTempData = async(update, io,name) => {
    mongoose.model("tempmatch").findOneAndUpdate({}, update, { new: true })
    .then((resdata) => {    
        io.emit(name, resdata);
    }).catch((err) => {
        console.log("Error", err);
    })

}


