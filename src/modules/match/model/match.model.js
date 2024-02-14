'use strict'
const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const matchSchema = new mongoose.Schema({
     teamA:{type: mongoose.Schema.Types.ObjectId, ref:"teams"},
     teamB:{type: mongoose.Schema.Types.ObjectId, ref:"teams"},
     tournament:{type: mongoose.Schema.Types.ObjectId, ref:"tournaments"},
     round:{type: String},
     date:{type: Date},
     time:{type: String},
     utc_date:{type: Date},
     utc_time:{type: String},
     is_checked:{type: Boolean, default: false},
     federation_logo:{type: String, default:null},

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
     winning_team:{type: mongoose.Schema.Types.ObjectId, ref:"teams",default:null},
     losing_team: {type: mongoose.Schema.Types.ObjectId, ref:"teams", default: null},
     image:{type: String},
     utc_date_time:{type: Date},
     status:{type: String, enum:["pending","active","completed"], default:"pending"}
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('matches', matchSchema, 'matches');














