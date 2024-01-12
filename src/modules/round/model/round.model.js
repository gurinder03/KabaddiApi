'use strict'
const mongoose = require('mongoose'); 
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const roundSchema = new mongoose.Schema({
     match_id:{type: String},
     teamA:{type: String},
     teamB:{type: String},
     round:{type: Number},
     teamA_score:{
       is_first_raider_or_stopper:{type: Boolean, default: true},
       hold:{type: Number, default:0}, 
       stopper:{type: Number, default:0},
       raider:{type: Number, default:0},
       score:{type: Number, default:0}
     },
     teamB_score:{
        is_first_raider_or_stopper:{type: Boolean, default: true},
        hold:{type: Number, default:0},    
        stopper:{type: Number, default:0},
        raider:{type: Number, default:0},
        score:{type: Number, default:0}
     }
},
    {
        versionKey: false,
        timestamps: true
    },{createAt: "created_at", updatedAt: "updated_at"})

module.exports = mongoose.model('rounds', roundSchema, 'rounds');










