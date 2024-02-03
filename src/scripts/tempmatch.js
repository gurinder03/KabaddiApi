
const mongoose = require('mongoose');
const tempModel = require("../modules/match/model/tempmatch.model");
const config = require('../config/config');
const dbPath = `mongodb://${config.MONGO_URL}/${config.DB_NAME}`;
mongoose.Promise = global.Promise;
mongoose.connect(dbPath).then(() => {
    tempModel.create({
        is_show_federation_logo:false,
        is_show_add:false,
        is_show_image:false,
        is_show_coach:false,
        is_show_video:false,
        is_show_marquee_logo:false,
        is_show_full_screen:false,
        is_swap_team:false,
        is_score_added:false,
        is_score_done:false,
        is_show_refree:false,
        is_show_chiefguest:false,
        is_show_team:false,
        is_show_commentator:false,
        is_show_match:false,
        is_show_flag:false,
        is_show_score:false,
        is_show_sponser_logo:false,
        chiefguest: [],
        refree: [],
        commentator: [],
        match:[],
        card:[],
        coach:[]
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })

}).catch((err) => {
    console.log(err);
});
mongoose.connection.on('error', (err) => {
    console.log('Mongdb connection failed due to error : ', err);
});

