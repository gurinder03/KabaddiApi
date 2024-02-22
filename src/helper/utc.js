
const moment = require('moment-timezone');
module.exports.utcDateTime = (date,time) =>{
    let timezone = "Asia/Kolkata";
    let date_time = `${date} ${time}`
    const inputDateTime = moment.tz(date_time,timezone);
    const utcDateTime = inputDateTime.utc().format();
    return utcDateTime
}