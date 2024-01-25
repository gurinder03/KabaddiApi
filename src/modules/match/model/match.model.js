'use strict'
const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const matchSchema = new mongoose.Schema({
     teamA:{type: mongoose.Schema.Types.ObjectId, ref:"teams"},
     teamB:{type: mongoose.Schema.Types.ObjectId, ref:"teams"},
     tournament:{type: mongoose.Schema.Types.ObjectId, ref:"tournaments"},
     round:{type: Number},
     date:{type: Date},
     time:{type: String},
     utc_date:{type: Date},
     utc_time:{type: String},
     federation_logo:{type: String, default:null},
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

     teamA_score:{
       name:{type: String},
       position:{type: String},  
       admin_position:{type: String},   
       logo:{type: String},
       hold:{type: Number, default:0}, // add to hold remove from total
       stopper:{type: Number, default:0},
       raider:{type: Number, default:0},
       score:{type: Number, default:0},
       addon:{type: Number, default:0}
     },
     teamB_score:{
        name:{type: String},
        position:{type: String},
        admin_position:{type: String}, 
        logo:{type: String},
        hold:{type: Number, default:0},     // add to hold remove from total
        stopper:{type: Number, default:0},
        raider:{type: Number, default:0},
        score:{type: Number, default:0},
        addon:{type: Number, default:0}
     },
     place:{type: String},
     type:{type:String},
     is_show_score:{type: Boolean, default: false},
     sponser_logo:{type: String, default:null},
     is_show_sponser_logo:{type: Boolean, default: false},
     winning_team:{type: mongoose.Schema.Types.ObjectId, ref:"teams",default:null},
     losing_team: {type: mongoose.Schema.Types.ObjectId, ref:"teams", default: null},
     is_checked:{type: Boolean, default: false},
     team:[],
     chiefguest: [],
     refree: [],
     commentator: [],
     match:[],
     coach:[],
     image:{type: String},
     utc_date_time:{type: Date},
     status:{type: String, enum:["pending","active","completed"], default:"pending"}
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('matches', matchSchema, 'matches');














