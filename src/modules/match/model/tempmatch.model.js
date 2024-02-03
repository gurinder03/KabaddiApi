'use strict'
const mongoose = require('mongoose'); 

const tempmatchSchema = new mongoose.Schema({
     is_show_federation_logo:{type: Boolean, default: false},
     is_show_add:{type: Boolean, default: false},
     is_show_image:{type: Boolean, default:false},
     is_show_coach:{type: Boolean, default:false},
     is_show_video:{type: Boolean, default:false},
     is_show_marquee_logo:{type: Boolean, default: false},
     is_show_full_screen:{type: Boolean, default: false},
     is_swap_team:{type: Boolean, default: false},
     is_score_added:{type: Boolean, default: false},
     is_score_done:{type: Boolean, default: false},
     is_show_refree:{type: Boolean, default: false},
     is_show_chiefguest: {type: Boolean, default: false},
     is_show_team:{type: Boolean, default: false},
     is_show_commentator:{type: Boolean, default: false},
     is_show_match:{type: Boolean, default: false},
     is_show_flag:{type: Boolean, default: false},
     is_show_score:{type: Boolean, default: false},
     is_show_sponser_logo:{type: Boolean, default: false},
     chiefguest: [],
     refree: [],
     commentator: [],
     match:[],
     card:[],
     coach:[]
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('tempmatch', tempmatchSchema, 'tempmatch');














